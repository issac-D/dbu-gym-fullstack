<?php

namespace App\Http\Requests\Member;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->user()?->id;

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $userId],
            'email_confirmation' => ['required', 'same:email'],
            'phone' => ['nullable', 'string', 'max:30'],
            'department' => ['nullable', 'string', 'max:100'],
            'university_id' => ['nullable', 'string', 'max:50'],
            'membership_type' => ['nullable', 'string', 'max:50'],
            'membership_plan' => ['nullable', 'string', 'max:50'],
            'member_id' => ['nullable', 'string', 'max:50'],
        ];
    }
}
