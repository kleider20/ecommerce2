<?php
// app/Models/GeneralSetting.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class GeneralSetting extends Model
{
    protected $fillable = [
        'site_name',
        'operating_country_iso2',
        'base_currency_code',
        'maintenance_mode',
        'maintenance_message',
        'logo_path',
        'favicon_path',
        'active_layout_year',
    ];

    protected $casts = [
        'maintenance_mode' => 'boolean',
    ];

    // Relación: país de operación
    public function operatingCountry()
    {
        return $this->belongsTo(Country::class, 'operating_country_iso2', 'iso2');
    }

    // Relación: moneda base del sistema
    public function baseCurrencyCountry()
    {
        return $this->belongsTo(Country::class, 'base_currency_code', 'currency_code');
    }

    // Accesor: ¿el sistema está en modo mantenimiento?
    public function getIsMaintenanceAttribute()
    {
        return $this->maintenance_mode;
    }

    // Método estático para obtener la configuración global (única)
    public static function current()
    {
        return self::with('operatingCountry', 'baseCurrencyCountry')
            ->firstOrCreate([], [
                'site_name' => 'Mi Tienda',
                'operating_country_iso2' => 'VE',
                'base_currency_code' => 'USD',
                'maintenance_mode' => false,
            ]);
    }

    // Método estático para obtener el año activo
    public static function getActiveLayoutYear(): string
    {
        return static::first()?->active_layout_year ?? '2026';
    }

    // Singleton con caché (corregido: incluye ambas relaciones)
    public static function instance()
    {
        return Cache::remember('general_settings', 3600, function () {
            return self::current(); // reutiliza current() para evitar duplicar lógica
        });
    }

    // Aplicar configuración global
    public static function apply()
    {
        $settings = self::instance();
        $country = $settings->operatingCountry;

        if ($country) {
            date_default_timezone_set($country->timezone);
            setlocale(LC_TIME, $country->locale . '.utf8');
        }
    }
}
