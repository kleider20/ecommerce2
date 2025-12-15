<?php

// app/Models/Product.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'category_id',
        'price_usd',
        'original_price_usd',
        'stock',
        'in_stock',
        'image_url',          // 👈 Imagen principal
        'gallery_urls',       // 👈 Nueva columna para la galería (JSON)
        'is_active',
        'brand',
        'is_bestseller',
        'is_new',
        'rating',
        'review_count',
        'free_shipping',
        'warranty',
        'price_per_unit',
        'sku',
        'short_description',
    ];

    protected $casts = [
        'price_usd' => 'decimal:2',
        'original_price_usd' => 'decimal:2',
        'stock' => 'integer',
        'in_stock' => 'boolean',
        'is_active' => 'boolean',
        'is_bestseller' => 'boolean',
        'is_new' => 'boolean',
        'rating' => 'decimal:2',
        'review_count' => 'integer',
        'free_shipping' => 'boolean',
        'gallery_urls' => 'array', // 👈 Cast a array para JSON
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
