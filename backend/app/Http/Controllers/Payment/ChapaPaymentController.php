<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Payment\InitializeChapaPaymentRequest;
use App\Services\Payment\ChapaPaymentService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use RuntimeException;

class ChapaPaymentController extends Controller
{
    public function __construct(private readonly ChapaPaymentService $chapaPaymentService)
    {
    }

    public function initialize(InitializeChapaPaymentRequest $request): JsonResponse
    {
        try {
            $transaction = $this->chapaPaymentService->initializeRegistrationPayment($request->validated());

            return response()->json([
                'message' => 'Payment initialized successfully.',
                'data' => [
                    'tx_ref' => $transaction->tx_ref,
                    'checkout_url' => $transaction->checkout_url,
                    'amount' => $transaction->amount,
                    'currency' => $transaction->currency,
                    'status' => $transaction->status,
                ],
            ], 201);
        } catch (RuntimeException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 422);
        }
    }

    public function verify(string $txRef): JsonResponse
    {
        try {
            $transaction = $this->chapaPaymentService->verifyTransaction($txRef);
        } catch (ModelNotFoundException) {
            return response()->json([
                'message' => 'Payment transaction not found.',
            ], 404);
        } catch (RuntimeException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 422);
        }

        $statusCode = $transaction->status === 'success' ? 200 : 422;

        return response()->json([
            'message' => $transaction->status === 'success'
                ? 'Payment verified successfully.'
                : 'Payment verification failed.',
            'data' => [
                'tx_ref' => $transaction->tx_ref,
                'status' => $transaction->status,
                'account_status' => $transaction->user?->account_status,
                'payment_status' => $transaction->user?->payment_status,
                'user_id' => $transaction->user_id,
            ],
        ], $statusCode);
    }

    public function webhook(Request $request): JsonResponse
    {
        try {
            $transaction = $this->chapaPaymentService->processWebhook(
                $request->all(),
                $request->getContent(),
                $request->header('x-chapa-signature'),
                $request->header('chapa-signature')
            );
        } catch (RuntimeException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 401);
        }

        return response()->json([
            'message' => 'Webhook processed successfully.',
            'data' => [
                'tx_ref' => $transaction?->tx_ref,
                'status' => $transaction?->status,
            ],
        ]);
    }
}
