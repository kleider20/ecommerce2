<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;
use App\Models\GeneralSetting;
use App\Models\Country;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        // 1. Obtener configuración global con manejo de errores
        $settings = GeneralSetting::first();

        if (!$settings) {
            try {
                $settings = GeneralSetting::create([
                    'site_name' => 'Mi Tienda',
                    'operating_country_iso2' => 'VE',
                    'base_currency_code' => 'USD',
                ]);
            } catch (\Exception $e) {
                // Fallback de emergencia
                $settings = (object) [
                    'site_name' => 'Mi Tienda',
                    'operating_country_iso2' => 'VE',
                    'base_currency_code' => 'USD',
                    'logo_path' => null,
                    'favicon_path' => null,
                    'maintenance_mode' => false,
                    'maintenance_message' => null,
                ];
            }
        }

        // 2. País del usuario (de sesión) o país base
        $userCountryIso2 = $request->session()->get('user_country_iso2', $settings->operating_country_iso2);

        // 3. Cargar país del usuario o del sistema
        $userCountry = Country::where('iso2', $userCountryIso2)->first()
            ?? Country::where('iso2', $settings->operating_country_iso2)->first();

        // 4. Fallback si no hay países
        if (!$userCountry) {
            $userCountry = (object) [
                'iso2' => 'VE',
                'currency_code' => 'VES',
                'currency_symbol' => 'Bs.S',
                'exchange_rate_to_usd' => 243.11,
                'currency_thousand_separator' => '.',
                'currency_decimal_separator' => ',',
                'currency_decimal_digits' => 2,
                'currency_symbol_position' => 'after',
                'locale' => 'es-VE',
            ];
        }

        // 5. userConfig para el frontend
        $userConfig = [
            'country_iso2' => $userCountry->iso2,
            'currency_code' => $userCountry->currency_code,
            'currency_symbol' => $userCountry->currency_symbol,
            'exchange_rate_to_usd' => (float) $userCountry->exchange_rate_to_usd,
            'currency_thousand_separator' => $userCountry->currency_thousand_separator,
            'currency_decimal_separator' => $userCountry->currency_decimal_separator,
            'currency_decimal_digits' => (int) $userCountry->currency_decimal_digits,
            'currency_symbol_position' => $userCountry->currency_symbol_position,
            'locale' => $userCountry->locale,
        ];

        // 6. Países disponibles
        $availableCountries = Country::where('is_active', true)
            ->select('name', 'iso2')
            ->get();

        return [
            ...parent::share($request),

            'auth' => [
                'user' => Auth::user() ? [
                    'id' => Auth::id(),
                    'name' => Auth::user()->name,
                    'roles' => Auth::user()->getRoleNames()->toArray(),
                    'permissions' => Auth::user()->getPermissionNames()->toArray(),
                ] : null,
            ],

            'appName' => $settings->site_name ?? 'Mi Tienda',
            'userConfig' => $userConfig,
            'selectedCountryIso2' => $userCountryIso2,
            'availableCountries' => $availableCountries,
            'system' => [
                'site_name' => $settings->site_name ?? 'Mi Tienda',
                'logo_url' => $settings->logo_path ? asset('storage/' . $settings->logo_path) : null,
                'favicon_url' => $settings->favicon_path ? asset('storage/' . $settings->favicon_path) : null,
                'base_currency_code' => $settings->base_currency_code ?? 'USD',
                'operating_country' => $settings->operatingCountry ?? null, // ← Ahora seguro
                'maintenance_mode' => $settings->maintenance_mode ?? false,
                'maintenance_message' => $settings->maintenance_message,
            ],
        ];
    }
}
