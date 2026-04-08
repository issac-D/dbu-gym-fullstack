<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'phone' => ['required', 'string', 'max:30'],
            'gender' => ['required', 'in:Male,Female'],
            'member_type' => ['required', 'in:university,external'],
            'membership_type' => ['required', 'in:Monthly,3Months,6Months,1Year'],
            'membership_plan' => ['nullable', 'string', 'max:50'],
            'university_id' => ['required_if:member_type,university', 'nullable', 'string', 'max:50'],
            'department' => ['required_if:member_type,university', 'nullable', 'string', 'max:100'],
            'national_id' => ['required_if:member_type,external', 'nullable', 'string', 'max:100'],
            'address' => ['required_if:member_type,external', 'nullable', 'string', 'max:255'],
            'date_of_birth' => ['nullable', 'date'],
            'emergency_contact_name' => ['nullable', 'string', 'max:100'],
            'emergency_contact_phone' => ['nullable', 'string', 'max:20'],
            'terms_accepted' => ['accepted'],
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
