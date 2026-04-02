<?php

namespace App\Services\Admin;

use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Collection;

class ApprovalService
{
    public function listPending(): Collection
    {
        return User::query()
            ->where('role', 'member')
            ->where('membership_status', 'pending')
            ->latest('created_at')
            ->get();
    }

    public function approve(User $user, User $admin): User
    {
        $user->update([
            'membership_status' => 'Active',
            'approved_by' => $admin->id,
            'approved_at' => Carbon::now(),
            'rejected_by' => null,
            'rejected_at' => null,
            'rejection_reason' => null,
        ]);

        return $user->refresh();
    }

    public function reject(User $user, User $admin, ?string $reason = null): User
    {
        $user->update([
            'membership_status' => 'rejected',
            'rejected_by' => $admin->id,
            'rejected_at' => Carbon::now(),
            'rejection_reason' => $reason,
        ]);

        return $user->refresh();
    }
}
