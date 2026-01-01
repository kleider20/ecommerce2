<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProviderProfile extends Model
{
    protected $fillable = [
        'user_id', 'company_name', 'company_ruc', 'company_address',
        'company_phone', 'company_email', 'company_website',
        'business_license', 'company_description'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
