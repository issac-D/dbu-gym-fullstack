<?php

namespace App\Services\Admin;

use App\Models\User;
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

    public function approve(User $user): User
    {
        $user->update([
            'membership_status' => 'Active',
        ]);

        return $user->refresh();
    }

    public function reject(User $user): User
    {
        $user->update([
            'membership_status' => 'rejected',
        ]);

        return $user->refresh();
    }
}
