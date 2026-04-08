<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data): User
    {
        $memberId = $this->generateMemberId($data['member_type'] ?? null);
        $plan = $data['membership_type'] ?? null;
        $planCost = $this->calculatePlanCost($plan, $data['member_type'] ?? null);
        $planStart = now();
        $planExpires = $this->calculatePlanExpiry($plan, $planStart);

        $user = User::query()->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'member',
            'account_status' => 'PendingApproval',
            'phone' => $data['phone'] ?? null,
            'gender' => $data['gender'] ?? null,
            'member_type' => $data['member_type'] ?? null,
            'membership_type' => $data['membership_type'] ?? null,
            'membership_plan' => $data['membership_plan'] ?? null,
            'membership_status' => 'pending',
            'payment_status' => 'Paid',
            'plan_start_at' => $planStart,
            'plan_expires_at' => $planExpires,
            'plan_cost' => $planCost,
            'university_id' => $data['university_id'] ?? null,
            'department' => $data['department'] ?? null,
            'national_id' => $data['national_id'] ?? null,
            'address' => $data['address'] ?? null,
            'member_id' => $memberId,
            'terms_accepted_at' => now(),
        ]);

        Member::query()->create([
            'user_id' => $user->id,
            'membership_type' => $data['member_type'] === 'external' ? 'External' : 'Student',
            'membership_expiry_date' => $planExpires?->toDateString() ?? now()->toDateString(),
            'date_of_birth' => $data['date_of_birth'] ?? null,
            'emergency_contact_name' => $data['emergency_contact_name'] ?? null,
            'emergency_contact_phone' => $data['emergency_contact_phone'] ?? null,
        ]);

        Auth::login($user);

        return $user;
    }

    private function generateMemberId(?string $memberType): string
    {
        do {
            $prefix = $memberType === 'external' ? 'EXT' : 'DBU';
            $year = date('Y');
            $sequence = str_pad((string) random_int(1, 9999), 4, '0', STR_PAD_LEFT);
            $candidate = $prefix . '-' . $year . '-' . $sequence;
        } while (User::query()->where('member_id', $candidate)->exists());

        return $candidate;
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

    private function calculatePlanExpiry(?string $plan, \Illuminate\Support\Carbon $start): ?\Illuminate\Support\Carbon
    {
        if (!$plan) {
            return null;
        }

        return match ($plan) {
            'Monthly' => $start->copy()->addMonth(),
            '3Months' => $start->copy()->addMonths(3),
            '6Months' => $start->copy()->addMonths(6),
            '1Year' => $start->copy()->addYear(),
            default => null,
        };
    }

    public function attemptLogin(Request $request, array $credentials): bool
    {
        return Auth::attempt($credentials, $request->boolean('remember'));
    }

    public function logout(Request $request): void
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
