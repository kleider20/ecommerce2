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
        'exchange_rate_from_api',
        'tax_rate',
        'tax_included_in_price',
        'timezone',
        'is_active',
        // 👇 Campos de formato de moneda (¡ESPECÍFICOS DE TU TABLA!)
        'currency_thousand_separator',
        'currency_decimal_separator',
        'currency_decimal_digits',
        'currency_symbol_position',
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
        // 👇 Cast explícito para dígitos decimales
        'currency_decimal_digits' => 'integer',
    ];

    /**
     * Obtiene la configuración del país en formato para frontend.
     */
    public function toFrontendArray(): array
    {
        return [
            'country_iso2' => $this->iso2,
            'country_name' => $this->name,
            'currency_code' => $this->currency_code,
            'currency_symbol' => $this->currency_symbol,
            'locale' => $this->locale,
            'tax_rate' => $this->tax_rate,
            'tax_included_in_price' => $this->tax_included_in_price,
            'timezone' => $this->timezone,
            'language' => $this->language_code,
            'flag_url' => $this->flag_url,
            'thousand_separator' => $this->currency_thousand_separator ?? ',',
            'decimal_separator' => $this->currency_decimal_separator ?? '.',
            'decimal_digits' => $this->currency_decimal_digits ?? 2,
            'symbol_position' => $this->currency_symbol_position ?? 'before',
            'exchange_rate_to_usd' => (float) $this->exchange_rate_to_usd,
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

    public function states()
    {
        return $this->hasMany(State::class);
    }
}
