<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_name',
        'facebook_link',
        'contact_number',
        'segment',
        'service',
        'subject',
        'coverage',
        'notes',
        'template_path',
        'status',
        'quoted_price',
    ];

    protected $casts = [
        'quoted_price' => 'decimal:2',
    ];
}