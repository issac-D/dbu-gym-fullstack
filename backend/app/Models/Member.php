<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    protected $fillable = [
        'user_id',
        'member_type',
        'membership_type',
        'membership_expiry_date',
        'date_of_birth',
        'emergency_contact_name',
        'emergency_contact_phone',
    ];
}
