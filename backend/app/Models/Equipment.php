<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $primaryKey = 'equipment_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'equipment_id',
        'equi_name',
        'type',
        'status',
        'notes',
    ];
}
