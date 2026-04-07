<?php

namespace App\Services\Admin;

use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Collection;

class ApprovalService
{
    public function list(array $filters = []): Collection
    {
        $query = User::query()->where('role', 'member');

        $status = $filters['status'] ?? 'pending';
        if ($status && $status !== 'all') {
            $statusValue = match (strtolower($status)) {
                'approved', 'active' => 'Active',
                'rejected' => 'rejected',
                default => 'pending',
            };
            $query->where('membership_status', $statusValue);
        }

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

        $fromDate = $filters['from_date'] ?? null;
        if ($fromDate) {
            $query->whereDate('created_at', '>=', $fromDate);
        }
        $toDate = $filters['to_date'] ?? null;
        if ($toDate) {
            $query->whereDate('created_at', '<=', $toDate);
        }

        return $query->latest('created_at')->get();
    }

    public function listHistory(array $filters = []): Collection
    {
        $query = User::query()
            ->where('role', 'member')
            ->where(function ($builder) {
                $builder->whereNotNull('approved_at')
                    ->orWhereNotNull('rejected_at');
            })
            ->with(['approvedBy', 'rejectedBy']);

        $status = $filters['status'] ?? 'all';
        if ($status && $status !== 'all') {
            $statusValue = match (strtolower($status)) {
                'approved', 'active' => 'Active',
                'rejected' => 'rejected',
                default => null,
            };
            if ($statusValue) {
                $query->where('membership_status', $statusValue);
            }
        }

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

        $fromDate = $filters['from_date'] ?? null;
        if ($fromDate) {
            $query->whereDate('updated_at', '>=', $fromDate);
        }
        $toDate = $filters['to_date'] ?? null;
        if ($toDate) {
            $query->whereDate('updated_at', '<=', $toDate);
        }

        return $query->latest('updated_at')->get();
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
