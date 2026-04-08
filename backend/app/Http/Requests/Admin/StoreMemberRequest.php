<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['nullable', 'string', 'min:8'],
            'phone' => ['required', 'string', 'max:30'],
            'gender' => ['required', 'in:Male,Female'],
            'member_type' => ['required', 'in:university,external'],
            'membership_type' => ['required', 'in:Monthly,3Months,6Months,1Year'],
            'membership_plan' => ['nullable', 'string', 'max:50'],
            'university_id' => ['required_if:member_type,university', 'nullable', 'string', 'max:50'],
            'department' => ['required_if:member_type,university', 'nullable', 'string', 'max:100'],
            'national_id' => ['required_if:member_type,external', 'nullable', 'string', 'max:100'],
            'address' => ['required_if:member_type,external', 'nullable', 'string', 'max:255'],
            'account_status' => ['nullable', 'in:PendingApproval,Active,Inactive'],
            'internal_role' => ['nullable', 'in:Student,Staff'],
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
