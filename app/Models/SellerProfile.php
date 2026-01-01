<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SellerProfile extends Model
{
    protected $fillable = [
        'user_id', 'store_name', 'store_category', 'store_address',
        'store_phone', 'store_email', 'store_hours', 'store_description'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
