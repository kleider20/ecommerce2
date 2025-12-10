<?php

// app/Services/CountryService.php
namespace App\Services;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryService
{
    /**
     * Resuelve el código de país a usar para la sesión actual.
     *
     * Prioridad:
     * 1. Sesión (`user_country_iso2`)
     * 2. País base del sistema (`general_settings.operating_country_iso2`)
     * 3. Venezuela (`VE`) como último recurso
     */
    public function resolveCountryCode(Request $request): string
    {
        // 1. Si el usuario eligió un país en esta sesión, usa ese
        if ($request->session()->has('user_country_iso2')) {
            return $request->session()->get('user_country_iso2');
        }

        // 2. Si no, usa el país de operación del sistema
        $settings = \App\Models\GeneralSetting::first();
        if ($settings && $settings->operating_country_iso2) {
            return $settings->operating_country_iso2;
        }

        // 3. Fallback seguro
        return 'VE';
    }

    /**
     * Devuelve la configuración del país para el frontend.
     */
    public function getCountryConfig(Request $request): array
    {
        $countryCode = $this->resolveCountryCode($request);

        // Buscar el país
        $country = Country::where('iso2', $countryCode)->first();

        // Si no existe, usar un fallback mínimo
        if (!$country) {
            return $this->getFallbackConfig();
        }

        return $country->toFrontendArray();
    }

    /**
     * Configuración de respaldo para Venezuela.
     */
    private function getFallbackConfig(): array
    {
        return [
            'country_iso2' => 'VE',
            'currency_code' => 'VES',
            'currency_symbol' => 'Bs',
            'exchange_rate_to_usd' => 243.11,
            'thousand_separator' => '.',
            'decimal_separator' => ',',
            'decimal_digits' => 2,
            'symbol_position' => 'after',
            'locale' => 'es-VE',
        ];
    }
}
