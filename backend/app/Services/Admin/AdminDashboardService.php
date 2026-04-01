<?php

namespace App\Services\Admin;

use App\Models\User;

class AdminDashboardService
{
    public function build(): array
    {
        $totalMembers = User::query()->where('role', 'member')->count();
        $activeMembers = User::query()->where('role', 'member')->where('membership_status', 'Active')->count();
        $pendingMembers = User::query()->where('role', 'member')->where('membership_status', 'pending')->count();
        $revenue = User::query()->where('role', 'member')->sum('plan_cost');

        return [
            'stats' => [
                'total_members' => $totalMembers,
                'active_members' => $activeMembers,
                'pending_members' => $pendingMembers,
                'total_revenue' => $revenue,
            ],
        ];
    }
}
