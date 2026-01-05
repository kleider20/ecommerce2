<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    protected $fillable = ['country_id', 'name', 'code', 'is_active'];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
