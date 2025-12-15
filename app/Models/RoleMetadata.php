<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleMetadata extends Model
{
    protected $fillable = [

        'role_id',
        'display_name',
        'description',
        'color',
        'icon',
        'users_count',
        'permissions_count',
        'show_in_register',

    ];

     public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
