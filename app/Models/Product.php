<?php

// app/Models/Product.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'category',
        'price_usd',
        'original_price_usd',
        'stock',
        'in_stock',
        'image_url',
        'is_active',
    ];

    protected $casts = [
        'price_usd' => 'float',
        'original_price_usd' => 'float',
        'in_stock' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Relación: un producto pertenece a un usuario (proveedor)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Formatea el precio en la moneda del país actual
     */
    public function formatPrice($country)
    {
        if ($country->exchange_rate_to_usd <= 0) {
            return $this->price_usd;
        }

        $priceInLocalCurrency = $this->price_usd / $country->exchange_rate_to_usd;
        return number_format($priceInLocalCurrency, 2, ',', '.');
    }

    // Relación: un producto pertenece a una categoría
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
