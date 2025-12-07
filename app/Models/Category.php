<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'parent_id',
        'status',
        'meta_title',
        'meta_description',
        'image_path',
    ];

    // Relación: una categoría puede tener muchas subcategorías
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    // Relación: una categoría pertenece a una categoría padre (opcional)
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    // Relación: una categoría tiene muchos productos
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    // Scope para categorías raíz
    public function scopeRoot($query)
    {
        return $query->whereNull('parent_id');
    }

    // Scope para categorías activas
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
