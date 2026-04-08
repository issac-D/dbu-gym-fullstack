<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $primaryKey = 'schedule_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'schedule_id',
        'scheduled_datetime',
        'status',
    ];
}
