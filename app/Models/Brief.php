<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brief extends Model
{
    protected $fillable = [
        'name',
        'email',
        'company',
        'budget',
        'message',
        'tech_stack',
        'status',
    ];

    protected $casts = [
        'tech_stack' => 'array',
    ];
}
