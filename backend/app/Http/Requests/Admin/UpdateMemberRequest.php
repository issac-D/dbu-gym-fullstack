<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class UpdateMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255', Rule::unique('users', 'email')->ignore($this->route('user'))],
            'password' => ['nullable', 'string', 'min:8'],
            'phone' => ['sometimes', 'string', 'max:30'],
            'gender' => ['sometimes', 'in:Male,Female'],
            'member_type' => ['sometimes', 'in:university,external'],
            'membership_type' => ['sometimes', 'in:Monthly,3Months,6Months,1Year'],
            'membership_plan' => ['nullable', 'string', 'max:50'],
            'internal_role' => ['nullable', 'in:Student,Staff'],
            'university_id' => ['nullable', 'string', 'max:50'],
            'department' => ['nullable', 'string', 'max:100'],
            'national_id' => ['nullable', 'string', 'max:100'],
            'address' => ['nullable', 'string', 'max:255'],
            'account_status' => ['nullable', 'in:PendingApproval,Active,Inactive'],
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Validation failed.',
            'errors' => $validator->errors(),
        ], 400));
    }
}
