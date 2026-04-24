<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PaymentApprovalFlowTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config()->set('services.chapa.secret_key', 'test-secret');
        config()->set('services.chapa.base_url', 'https://api.chapa.co/v1');
    }

    public function test_initialize_then_verify_creates_user(): void
    {
        Http::fake([
            'https://api.chapa.co/v1/transaction/initialize' => Http::response([
                'status' => 'success',
                'message' => 'initialized',
                'data' => [
                    'checkout_url' => 'https://checkout.chapa.co/pay/mock',
                ],
            ], 200),
            'https://api.chapa.co/v1/transaction/verify/*' => Http::response([
                'status' => 'success',
                'message' => 'verified',
                'data' => [
                    'status' => 'success',
                    'amount' => 300,
                    'currency' => 'ETB',
                ],
            ], 200),
        ]);

        $payload = $this->validExternalPayload('member-success@example.com');

        $initialize = $this->postJson('/api/payments/chapa/initialize', $payload)
            ->assertCreated()
            ->assertJsonPath('data.status', 'pending');

        $txRef = (string) $initialize->json('data.tx_ref');

        $this->getJson("/api/payments/chapa/verify/{$txRef}")
            ->assertOk()
            ->assertJsonPath('data.status', 'success');

        $this->assertDatabaseHas('users', [
            'email' => $payload['email'],
            'role' => 'member',
            'payment_status' => 'Paid',
            'membership_status' => 'pending',
            'account_status' => 'PendingApproval',
        ]);

        $user = User::query()->where('email', $payload['email'])->firstOrFail();

        $this->assertDatabaseHas('payment_transactions', [
            'tx_ref' => $txRef,
            'status' => 'success',
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseHas('members', [
            'user_id' => $user->id,
            'member_type' => 'external',
            'membership_type' => 'Monthly',
        ]);
    }

    public function test_failed_verify_does_not_create_user(): void
    {
        Http::fake([
            'https://api.chapa.co/v1/transaction/initialize' => Http::response([
                'status' => 'success',
                'message' => 'initialized',
                'data' => [
                    'checkout_url' => 'https://checkout.chapa.co/pay/mock',
                ],
            ], 200),
            'https://api.chapa.co/v1/transaction/verify/*' => Http::response([
                'status' => 'success',
                'message' => 'failed at gateway',
                'data' => [
                    'status' => 'failed',
                    'amount' => 300,
                    'currency' => 'ETB',
                ],
            ], 200),
        ]);

        $payload = $this->validExternalPayload('member-failed@example.com');

        $initialize = $this->postJson('/api/payments/chapa/initialize', $payload)
            ->assertCreated();

        $txRef = (string) $initialize->json('data.tx_ref');

        $this->getJson("/api/payments/chapa/verify/{$txRef}")
            ->assertStatus(422)
            ->assertJsonPath('data.status', 'failed');

        $this->assertDatabaseMissing('users', [
            'email' => $payload['email'],
        ]);

        $this->assertDatabaseHas('payment_transactions', [
            'tx_ref' => $txRef,
            'status' => 'failed',
            'user_id' => null,
        ]);
    }

    public function test_admin_approve_updates_membership_and_account_status(): void
    {
        $admin = User::factory()->create([
            'name' => 'Main Admin',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'account_status' => 'Active',
        ]);

        $member = User::factory()->create([
            'name' => 'Pending Member',
            'email' => 'pending-member@example.com',
            'role' => 'member',
            'account_status' => 'PendingApproval',
            'membership_status' => 'pending',
            'payment_status' => 'Paid',
        ]);

        Sanctum::actingAs($admin);

        $this->postJson("/api/admin/approvals/{$member->id}/approve")
            ->assertOk()
            ->assertJsonPath('user.membership_status', 'Active')
            ->assertJsonPath('user.account_status', 'Active');

        $this->assertDatabaseHas('users', [
            'id' => $member->id,
            'membership_status' => 'Active',
            'account_status' => 'Active',
            'approved_by' => $admin->id,
        ]);
    }

    private function validExternalPayload(string $email): array
    {
        return [
            'name' => 'Test External User',
            'email' => $email,
            'password' => 'Password@1',
            'password_confirmation' => 'Password@1',
            'phone' => '0912345678',
            'gender' => 'Male',
            'member_type' => 'external',
            'membership_type' => 'Monthly',
            'membership_plan' => 'Monthly',
            'national_id' => 'FAN-1234-5678-9012',
            'address' => 'Bole, Addis Ababa',
            'terms_accepted' => true,
            'return_url' => 'http://localhost:5173/payments/chapa/return',
            'callback_url' => 'http://localhost:5173/payments/chapa/return',
        ];
    }
}
