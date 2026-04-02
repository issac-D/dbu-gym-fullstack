<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SystemSetting extends Model
{
    protected $fillable = [
        'system_name',
        'language',
        'timezone',
        'maintenance_mode',
        'two_fa',
        'password_min_length',
        'password_expiry_days',
        'password_special_chars',
        'session_timeout',
        'max_login_attempts',
        'email_notifications',
        'sms_notifications',
        'sender_email',
        'api_key',
        'auto_backup',
        'backup_frequency',
        'theme',
        'accent_color',
        'layout_style',
        'updated_by',
    ];

    protected $casts = [
        'maintenance_mode' => 'boolean',
        'two_fa' => 'boolean',
        'password_special_chars' => 'boolean',
        'email_notifications' => 'boolean',
        'sms_notifications' => 'boolean',
        'auto_backup' => 'boolean',
    ];
}
