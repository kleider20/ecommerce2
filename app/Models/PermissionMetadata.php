<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PermissionMetadata extends Model
{
    protected $fillable = [

        'permission_id',
        'display_name',
        'description',
        'is_critical',
        'category',
    ];

    // public function permission()
    // {
    //     return $this->belongsTo(Permission::class, 'permission_id');
    // }

     protected $casts = [
        'is_critical' => 'boolean',
    ];

    public function permission()
    {
        return $this->belongsTo(Permission::class);
    }
}
