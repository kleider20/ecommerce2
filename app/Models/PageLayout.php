<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageLayout extends Model
{
    protected $fillable = [
        'page_name',
        'layout_path',
        'permission',
        'role',
        'is_active'
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
