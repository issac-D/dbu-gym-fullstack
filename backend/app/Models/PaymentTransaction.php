<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'tx_ref',
    'gateway',
    'status',
    'amount',
    'currency',
    'email',
    'checkout_url',
    'registration_payload',
    'gateway_response',
    'verified_at',
    'failed_at',
    'failure_reason',
    'user_id',
])]
class PaymentTransaction extends Model
{
    protected function casts(): array
    {
        return [
            'registration_payload' => 'array',
            'gateway_response' => 'array',
            'verified_at' => 'datetime',
            'failed_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
