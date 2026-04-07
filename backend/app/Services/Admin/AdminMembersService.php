<?php

namespace App\Services\Admin;

use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AdminMembersService
{
    public function list(array $filters = [], int $perPage = 8): LengthAwarePaginator
    {
        $query = User::query()->where('role', 'member');

        $search = trim((string) ($filters['search'] ?? ''));
        if ($search !== '') {
            $query->where(function ($builder) use ($search) {
                $builder->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('member_id', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $memberType = $filters['member_type'] ?? null;
        if ($memberType === 'university' || $memberType === 'external') {
            $query->where('member_type', $memberType);
        }

        $status = $filters['status'] ?? null;
        if ($status === 'expired') {
            $query->whereNotNull('plan_expires_at')
                ->where('plan_expires_at', '<', Carbon::now()->startOfDay());
        } elseif ($status === 'expiring_soon') {
            $query->whereNotNull('plan_expires_at')
                ->whereBetween('plan_expires_at', [Carbon::now()->startOfDay(), Carbon::now()->addDays(7)->endOfDay()]);
        } elseif ($status === 'active') {
            $query->whereNotNull('plan_expires_at')
                ->where('plan_expires_at', '>', Carbon::now()->addDays(7)->endOfDay());
        }

        return $query->latest('created_at')->paginate($perPage);
    }

    public function create(array $data, User $admin): User
    {
        $plan = $data['membership_type'] ?? null;
        $planStart = now();
        $planExpires = $this->calculatePlanExpiry($plan, $planStart);
        $planCost = $this->calculatePlanCost($plan, $data['member_type'] ?? null);

        return User::query()->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'] ?? 'dbugym123'),
            'role' => 'member',
            'account_status' => $data['account_status'] ?? 'active',
            'phone' => $data['phone'] ?? null,
            'gender' => $data['gender'] ?? null,
            'member_type' => $data['member_type'] ?? null,
            'membership_type' => $data['membership_type'] ?? null,
            'membership_plan' => $data['membership_plan'] ?? $plan,
            'membership_status' => 'approved',
            'approved_by' => $admin->id,
            'approved_at' => now(),
            'payment_status' => 'Paid',
            'plan_start_at' => $planStart,
            'plan_expires_at' => $planExpires,
            'plan_cost' => $planCost,
            'university_id' => $data['university_id'] ?? null,
            'department' => $data['department'] ?? null,
            'national_id' => $data['national_id'] ?? null,
            'address' => $data['address'] ?? null,
            'member_id' => $this->generateMemberId($data['member_type'] ?? null),
        ]);
    }

    public function update(User $user, array $data): User
    {
        $plan = $data['membership_type'] ?? $user->membership_type;
        $planStart = $user->plan_start_at ?? now();
        $planExpires = $user->plan_expires_at;
        $planCost = $user->plan_cost;

        if (array_key_exists('membership_type', $data)) {
            $planStart = now();
            $planExpires = $this->calculatePlanExpiry($plan, $planStart);
            $planCost = $this->calculatePlanCost($plan, $data['member_type'] ?? $user->member_type);
        }

        $payload = array_filter([
            'name' => $data['name'] ?? null,
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'gender' => $data['gender'] ?? null,
            'member_type' => $data['member_type'] ?? null,
            'membership_type' => $data['membership_type'] ?? null,
            'membership_plan' => $data['membership_plan'] ?? null,
            'account_status' => $data['account_status'] ?? null,
            'university_id' => $data['university_id'] ?? null,
            'department' => $data['department'] ?? null,
            'national_id' => $data['national_id'] ?? null,
            'address' => $data['address'] ?? null,
        ], static fn ($value) => $value !== null);

        if (!empty($data['password'])) {
            $payload['password'] = Hash::make($data['password']);
        }

        if (array_key_exists('membership_type', $data)) {
            $payload['membership_plan'] = $data['membership_plan'] ?? $plan;
            $payload['plan_start_at'] = $planStart;
            $payload['plan_expires_at'] = $planExpires;
            $payload['plan_cost'] = $planCost;
        }

        $user->fill($payload);
        $user->save();

        return $user->refresh();
    }

    public function setAccountStatus(User $user, string $status): User
    {
        $user->account_status = $status;
        $user->save();

        return $user->refresh();
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

    private function calculatePlanExpiry(?string $plan, Carbon $start): ?Carbon
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
}
