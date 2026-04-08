<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $avatarUrl = $this->avatar_path ? url(Storage::url($this->avatar_path)) : null;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'role' => $this->role,
            'account_status' => $this->account_status,
            'phone' => $this->phone,
            'member_id' => $this->member_id,
            'membership_type' => $this->membership_type,
            'membership_plan' => $this->membership_plan,
            'membership_status' => $this->membership_status,
            'payment_status' => $this->payment_status,
            'plan_start_at' => $this->plan_start_at,
            'plan_expires_at' => $this->plan_expires_at,
            'plan_cost' => $this->plan_cost,
            'approved_by' => $this->approved_by,
            'approved_at' => $this->approved_at,
            'rejected_by' => $this->rejected_by,
            'rejected_at' => $this->rejected_at,
            'rejection_reason' => $this->rejection_reason,
            'approved_by_name' => $this->approvedBy?->name,
            'rejected_by_name' => $this->rejectedBy?->name,
            'university_id' => $this->university_id,
            'department' => $this->department,
            'admin_role' => $this->adminProfile?->admin_role,
            'permissions_set' => $this->adminProfile?->permissions_set,
            'member_type' => $this->member_type,
            'internal_role' => $this->internal_role,
            'member_profile' => $this->memberProfile ? [
                'membership_type' => $this->memberProfile->membership_type,
                'membership_expiry_date' => $this->memberProfile->membership_expiry_date,
                'date_of_birth' => $this->memberProfile->date_of_birth,
                'emergency_contact_name' => $this->memberProfile->emergency_contact_name,
                'emergency_contact_phone' => $this->memberProfile->emergency_contact_phone,
                'member_type' => $this->memberProfile->member_type,
            ] : null,
            'gender' => $this->gender,
            'national_id' => $this->national_id,
            'address' => $this->address,
            'avatar_url' => $avatarUrl,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
