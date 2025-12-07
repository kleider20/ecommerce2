<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Country extends Model
{
    use HasFactory;

    /**
     * La tabla asociada al modelo.
     */
    protected $table = 'countries';

    /**
     * Los atributos que son asignables masivamente.
     */
    protected $fillable = [
        'name',
        'iso2',
        'iso3',
        'phone_code',
        'capital',
        'region',
        'flag_url',
        'language_name',
        'language_code',
        'locale',
        'currency_name',
        'currency_code',
        'currency_symbol',
        'currency_format',
        'exchange_rate_to_usd',
        'tax_rate',
        'tax_included_in_price',
        'timezone',
        'is_active',
        'exchange_rate_from_api',
    ];

    /**
     * Los atributos que deben convertirse a tipos nativos.
     */
    protected $casts = [
        'exchange_rate_to_usd' => 'decimal:6',
        'exchange_rate_from_api' => 'decimal:6',
        'tax_rate' => 'decimal:2',
        'tax_included_in_price' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Obtiene la configuración del país en formato para frontend.
     */
    public function toFrontendArray(): array
    {
        return [
            'country_code' => $this->iso2,
            'country_name' => $this->name,
            'currency_code' => $this->currency_code,
            'currency_symbol' => $this->currency_symbol,
            'locale' => $this->locale,
            'tax_rate' => $this->tax_rate,
            'tax_included_in_price' => $this->tax_included_in_price,
            'timezone' => $this->timezone,
            'language' => $this->language_code,
            'flag_url' => $this->flag_url,
        ];
    }

    /**
     * Alcance: solo países activos.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Busca un país por su código ISO2 (ej: 'VE').
     */
    public static function findByIso2(string $iso2): ?self
    {
        return self::active()->where('iso2', strtoupper($iso2))->first();
    }
}
