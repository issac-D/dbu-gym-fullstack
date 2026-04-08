<?php

namespace App\Services\Membership;

use App\Models\User;
use App\Models\Member;
use Illuminate\Support\Carbon;

class MembershipService
{
    public function renew(User $user, ?string $plan): User
    {
        $selectedPlan = $plan ?: $user->membership_type;
        $planCost = $this->calculatePlanCost($selectedPlan, $user->member_type);
        $start = now();
        $expires = $this->calculatePlanExpiry($selectedPlan, $start);

        $user->update([
            'membership_type' => $selectedPlan,
            'membership_plan' => $selectedPlan,
            'plan_cost' => $planCost,
            'plan_start_at' => $start,
            'plan_expires_at' => $expires,
            'payment_status' => 'Paid',
            'membership_status' => 'Active',
        ]);

        Member::query()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'member_type' => $user->member_type,
                'membership_type' => $selectedPlan,
                'membership_expiry_date' => $expires?->toDateString(),
            ]
        );

        return $user->refresh();
    }

    public function calculatePlanCost(?string $plan, ?string $memberType): ?int
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

    public function calculatePlanExpiry(?string $plan, Carbon $start): ?Carbon
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
