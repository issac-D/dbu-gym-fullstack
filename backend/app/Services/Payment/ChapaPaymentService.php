<?php

namespace App\Services\Payment;

use App\Models\PaymentTransaction;
use App\Models\User;
use App\Services\Auth\AuthService;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;

class ChapaPaymentService
{
    public function __construct(private readonly AuthService $authService)
    {
    }

    public function initializeRegistrationPayment(array $payload): PaymentTransaction
    {
        if (User::query()->where('email', $payload['email'])->exists()) {
            throw new RuntimeException('User already exists.');
        }

        $amount = $this->calculatePlanCost($payload['membership_type'] ?? null, $payload['member_type'] ?? null);
        if (!$amount || $amount <= 0) {
            throw new RuntimeException('Invalid membership plan amount.');
        }

        $txRef = $this->generateTxRef();
        $splitName = $this->splitName($payload['name']);

        $registrationPayload = $payload;
        $registrationPayload['password_hashed'] = Hash::make($payload['password']);
        unset($registrationPayload['password'], $registrationPayload['password_confirmation']);

        $transaction = PaymentTransaction::query()->create([
            'tx_ref' => $txRef,
            'gateway' => 'chapa',
            'status' => 'pending',
            'amount' => $amount,
            'currency' => 'ETB',
            'email' => $payload['email'],
            'registration_payload' => $registrationPayload,
        ]);

        $response = Http::withToken($this->secretKey())
            ->acceptJson()
            ->post(rtrim((string) config('services.chapa.base_url'), '/') . '/transaction/initialize', [
                'amount' => (string) $amount,
                'currency' => 'ETB',
                'email' => $payload['email'],
                'first_name' => $splitName['first_name'],
                'last_name' => $splitName['last_name'],
                'phone_number' => $payload['phone'],
                'tx_ref' => $txRef,
                'callback_url' => $payload['callback_url'] ?? config('services.chapa.callback_url'),
                'return_url' => $payload['return_url'] ?? config('services.chapa.return_url'),
                'customization' => [
                    'title' => 'DBU Gym Payment',
                    'description' => 'Membership plan payment for registration',
                ],
            ]);

        $body = $response->json() ?? [];
        $checkoutUrl = Arr::get($body, 'data.checkout_url');

        $transaction->update([
            'checkout_url' => $checkoutUrl,
            'gateway_response' => $body,
        ]);

        if (!$response->successful() || !$checkoutUrl) {
            throw new RuntimeException($this->normalizeGatewayMessage($body, 'Failed to initialize Chapa payment.'));
        }

        return $transaction->refresh();
    }

    public function verifyTransaction(string $txRef): PaymentTransaction
    {
        return DB::transaction(function () use ($txRef) {
            $transaction = PaymentTransaction::query()
                ->where('tx_ref', $txRef)
                ->lockForUpdate()
                ->firstOrFail();

            if ($transaction->status === 'success' && $transaction->user_id) {
                return $transaction;
            }

            $response = Http::withToken($this->secretKey())
                ->acceptJson()
                ->get(rtrim((string) config('services.chapa.base_url'), '/') . '/transaction/verify/' . $txRef);

            $body = $response->json() ?? [];
            $gatewayStatus = strtolower((string) Arr::get($body, 'data.status', 'failed'));
            $gatewayAmount = (float) Arr::get($body, 'data.amount', 0);
            $gatewayCurrency = strtoupper((string) Arr::get($body, 'data.currency', 'ETB'));

            $isAmountValid = (int) round($gatewayAmount) === (int) $transaction->amount;
            $isCurrencyValid = $gatewayCurrency === strtoupper((string) $transaction->currency);
            $isSuccessful = $response->successful() && in_array($gatewayStatus, ['success', 'successful'], true);

            if (!$isSuccessful || !$isAmountValid || !$isCurrencyValid) {
                $transaction->update([
                    'status' => 'failed',
                    'failed_at' => now(),
                    'failure_reason' => $this->normalizeGatewayMessage($body, 'Payment verification failed.'),
                    'gateway_response' => $body,
                ]);

                return $transaction->refresh();
            }

            if (!$transaction->user_id) {
                $registrationPayload = $transaction->registration_payload ?? [];
                if (!$registrationPayload) {
                    throw new RuntimeException('Missing registration payload for this payment transaction.');
                }

                $existingUser = User::query()->where('email', $transaction->email)->first();
                $user = $existingUser ?: $this->authService->register($registrationPayload, false);

                $transaction->user_id = $user->id;
            }

            $transaction->status = 'success';
            $transaction->verified_at = now();
            $transaction->gateway_response = $body;
            $transaction->failure_reason = null;
            $transaction->save();

            return $transaction->refresh();
        });
    }

    public function processWebhook(array $payload, string $rawBody, ?string $signature, ?string $altSignature): ?PaymentTransaction
    {
        if (!$this->hasValidWebhookSignature($payload, $rawBody, $signature, $altSignature)) {
            throw new RuntimeException('Invalid webhook signature.');
        }

        $txRef = $this->extractTxRef($payload);
        if (!$txRef) {
            return null;
        }

        return $this->verifyTransaction($txRef);
    }

    private function hasValidWebhookSignature(array $payload, string $rawBody, ?string $signature, ?string $altSignature): bool
    {
        $secret = (string) (config('services.chapa.webhook_secret') ?: config('services.chapa.secret_key'));
        if ($secret === '') {
            return false;
        }

        $expectedPayloadHash = hash_hmac(
            'sha256',
            $rawBody !== '' ? $rawBody : (string) json_encode($payload),
            $secret
        );
        $expectedSecretHash = hash_hmac('sha256', $secret, $secret);

        $incoming = array_filter([$signature, $altSignature]);
        if ($incoming === []) {
            return false;
        }

        foreach ($incoming as $candidate) {
            $candidate = trim((string) $candidate);
            if ($candidate !== '' && (hash_equals($expectedPayloadHash, $candidate) || hash_equals($expectedSecretHash, $candidate))) {
                return true;
            }
        }

        return false;
    }

    private function extractTxRef(array $payload): ?string
    {
        return Arr::get($payload, 'tx_ref')
            ?? Arr::get($payload, 'trx_ref')
            ?? Arr::get($payload, 'data.tx_ref')
            ?? Arr::get($payload, 'data.trx_ref');
    }

    private function generateTxRef(): string
    {
        return 'DBU-REG-' . now()->format('YmdHis') . '-' . Str::upper(Str::random(8));
    }

    private function calculatePlanCost(?string $plan, ?string $memberType): ?int
    {
        $prices = [
            'Monthly' => 300,
            '3Months' => 800,
            '6Months' => 1500,
            '1Year' => 2500,
        ];

        if (!$plan || !isset($prices[$plan])) {
            return null;
        }

        $cost = $prices[$plan];

        if ($memberType === 'university') {
            $cost = (int) round($cost * 0.8);
        }

        return $cost;
    }

    private function splitName(string $fullName): array
    {
        $parts = preg_split('/\s+/', trim($fullName)) ?: [];
        $first = $parts[0] ?? $fullName;
        $last = count($parts) > 1 ? implode(' ', array_slice($parts, 1)) : '.';

        return [
            'first_name' => $first,
            'last_name' => $last,
        ];
    }

    private function secretKey(): string
    {
        $secret = (string) config('services.chapa.secret_key');
        if ($secret === '') {
            throw new RuntimeException('Payment secret key is missing. Set CHAPA_SECRET_KEY or PAYMENT_SECRET_KEY in backend/.env.');
        }

        return $secret;
    }

    private function normalizeGatewayMessage(array $body, string $fallback): string
    {
        $message = Arr::get($body, 'message', $fallback);

        if (is_string($message)) {
            return $message;
        }

        if (is_array($message)) {
            $flattened = [];
            array_walk_recursive($message, function ($value) use (&$flattened) {
                if (is_scalar($value)) {
                    $flattened[] = (string) $value;
                }
            });

            if ($flattened !== []) {
                return implode(' ', $flattened);
            }
        }

        if (is_scalar($message)) {
            return (string) $message;
        }

        return $fallback;
    }
}
