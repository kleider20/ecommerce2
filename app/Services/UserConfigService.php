<?php

// app/Services/UserConfigService.php
namespace App\Services;

use App\Models\Country;
use App\Models\SystemConfig;
use Illuminate\Http\Request;

class UserConfigService
{
    public function getUserConfig(Request $request): array
    {
        // 1. Determinar país (usuario logueado o sesión)
        $countryCode = $this->resolveCountryCode($request);

        // 2. Obtener país
        $country = Country::where('iso2', $countryCode)->first() ??
                   Country::where('iso2', 'VE')->first() ??
                   Country::first();

        if (!$country) {
            return $this->getFallbackConfig();
        }

        // 3. Obtener configuración del sistema
        $system = SystemConfig::instance();

        // 4. Calcular tasa de conversión a USD (para frontend)
        $exchangeRateToUsd = 1;
        if ($country->currency_code !== 'USD') {
            $rateFromSystem = $system->exchange_rates[$country->currency_code] ?? null;
            if ($rateFromSystem) {
                $exchangeRateToUsd = 1 / $rateFromSystem;
            }
        }

        return [
            'country_code' => $country->iso2,
            'country_name' => $country->name,
            'currency_code' => $country->currency_code,
            'currency_symbol' => $country->currency_symbol,
            'locale' => $country->locale,
            'tax_rate' => (float) $country->tax_rate,
            'tax_included_in_price' => (bool) $country->tax_included_in_price,
            'language' => $country->language_code,
            'exchange_rate_to_usd' => $exchangeRateToUsd, // Para convertir USD → moneda local en frontend
        ];
    }

    private function resolveCountryCode(Request $request): string
    {
        if (auth()->check() && auth()->user()->preferred_country) {
            return auth()->user()->preferred_country;
        }
        if ($request->session()->has('user_country')) {
            return $request->session()->get('user_country');
        }
        return 'VE';
    }

    private function getFallbackConfig(): array
    {
        return [
            'country_code' => 'VE',
            'country_name' => 'Venezuela',
            'currency_code' => 'VES',
            'currency_symbol' => 'Bs',
            'locale' => 'es-VE',
            'tax_rate' => 16.0,
            'tax_included_in_price' => false,
            'language' => 'es',
            'exchange_rate_to_usd' => 0.000012, // 1 Bs = 0.000012 USD
        ];
    }
}
