<?php

namespace App\Services\Admin;

use App\Models\User;
use Carbon\Carbon;

class AdminDashboardService
{
    public function build(): array
    {
        $totalMembers = User::query()->where('role', 'member')->count();
        $activeMembers = User::query()->where('role', 'member')->where('membership_status', 'Active')->count();
        $pendingMembers = User::query()->where('role', 'member')->where('membership_status', 'pending')->count();
        $revenue = User::query()->where('role', 'member')->sum('plan_cost');
        $chart = $this->buildChart();

        return [
            'stats' => [
                'total_members' => $totalMembers,
                'active_members' => $activeMembers,
                'pending_members' => $pendingMembers,
                'total_revenue' => $revenue,
            ],
            'chart' => $chart,
        ];
    }

    private function buildChart(): array
    {
        $labels = [];
        $joined = [];
        $expired = [];
        $pending = [];

        $start = Carbon::now()->startOfMonth()->subMonths(5);
        for ($i = 0; $i < 6; $i += 1) {
            $month = $start->copy()->addMonths($i);
            $labels[] = $month->format('M Y');
            $joined[] = 0;
            $expired[] = 0;
            $pending[] = 0;
        }

        $members = User::query()
            ->where('role', 'member')
            ->where(function ($query) use ($start) {
                $query->where('created_at', '>=', $start)
                    ->orWhere('plan_expires_at', '>=', $start);
            })
            ->get(['created_at', 'plan_expires_at', 'membership_status']);

        foreach ($members as $member) {
            if ($member->created_at) {
                $index = $this->monthIndex($member->created_at, $start);
                if ($index !== null) $joined[$index] += 1;
                if ($member->membership_status === 'pending') {
                    $pending[$index] += 1;
                }
            }
            if ($member->plan_expires_at) {
                $index = $this->monthIndex($member->plan_expires_at, $start);
                if ($index !== null) $expired[$index] += 1;
            }
        }

        return [
            'labels' => $labels,
            'joined' => $joined,
            'expired' => $expired,
            'pending' => $pending,
        ];
    }

    private function monthIndex(Carbon $date, Carbon $start): ?int
    {
        $diff = $start->diffInMonths($date, false);
        if ($diff < 0 || $diff > 5) return null;
        return $diff;
    }
}
