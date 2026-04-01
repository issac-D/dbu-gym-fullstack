<?php

namespace App\Http\Requests\Member;

use Illuminate\Foundation\Http\FormRequest;

class RenewMembershipRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'membership_type' => ['nullable', 'in:Monthly,3Months,6Months,1Year'],
        ];
    }
}
