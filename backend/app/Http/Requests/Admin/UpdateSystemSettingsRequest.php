<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSystemSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'system_name' => ['required', 'string', 'max:255'],
            'language' => ['required', 'string', 'max:10'],
            'timezone' => ['required', 'string', 'max:20'],
            'maintenance_mode' => ['boolean'],
            'two_fa' => ['boolean'],
            'password_min_length' => ['required', 'integer', 'min:6', 'max:64'],
            'password_expiry_days' => ['required', 'integer', 'min:0', 'max:365'],
            'password_special_chars' => ['boolean'],
            'session_timeout' => ['required', 'integer', 'min:5', 'max:480'],
            'max_login_attempts' => ['required', 'integer', 'min:1', 'max:10'],
            'email_notifications' => ['boolean'],
            'sms_notifications' => ['boolean'],
            'sender_email' => ['required', 'email', 'max:255'],
            'api_key' => ['nullable', 'string', 'max:255'],
            'auto_backup' => ['boolean'],
            'backup_frequency' => ['required', 'in:daily,weekly,monthly'],
            'theme' => ['required', 'in:dark,light'],
            'accent_color' => ['required', 'string', 'max:20'],
            'layout_style' => ['required', 'in:comfortable,compact'],
        ];
    }
}
