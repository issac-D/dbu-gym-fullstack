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
            'university_id' => $this->university_id,
            'department' => $this->department,
            'member_type' => $this->member_type,
            'gender' => $this->gender,
            'national_id' => $this->national_id,
            'address' => $this->address,
            'avatar_url' => $avatarUrl,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
