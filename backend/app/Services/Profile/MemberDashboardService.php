<?php

namespace App\Services\Profile;

use App\Models\User;
use Carbon\Carbon;

class MemberDashboardService
{
    public function build(User $user): array
    {
        $memberProfile = $user->memberProfile;
        $remainingDays = null;
        $expiry = $memberProfile?->membership_expiry_date ?? $user->plan_expires_at;
        if ($expiry) {
            $remainingDays = (int) Carbon::now()->diffInDays($expiry, false);
        }

        return [
            'member' => [
                'name' => $user->name,
                'member_id' => $user->member_id,
                'membership_type' => $memberProfile?->membership_type ?? $user->membership_type,
                'member_type' => $memberProfile?->member_type ?? $user->member_type,
                'status' => $user->membership_status,
                'university_id' => $user->university_id,
                'department' => $user->department,
                'email' => $user->email,
                'phone' => $user->phone,
                'date_of_birth' => $memberProfile?->date_of_birth,
                'emergency_contact_name' => $memberProfile?->emergency_contact_name,
                'emergency_contact_phone' => $memberProfile?->emergency_contact_phone,
                'avatar_url' => $user->avatar_path ? url(\Illuminate\Support\Facades\Storage::url($user->avatar_path)) : null,
            ],
            'plan' => [
                'type' => $user->membership_plan ?: ($memberProfile?->membership_type ?? $user->membership_type),
                'start_date' => $user->plan_start_at,
                'expiry_date' => $memberProfile?->membership_expiry_date ?? $user->plan_expires_at,
                'cost' => $user->plan_cost,
                'payment_status' => $user->payment_status,
                'remaining_days' => $remainingDays,
            ],
        ];
    }
}
