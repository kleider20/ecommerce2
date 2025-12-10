<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        // 1. Obtener configuración global (con valor por defecto seguro)
        $settings = GeneralSetting::first() ?? GeneralSetting::create([
            'site_name' => 'Mi Tienda',
            'operating_country_iso2' => 'VE',
            'base_currency_code' => 'USD',
        ]);

        // 2. País del usuario (de sesión) o país base
        $baseCountryIso2 = $settings->operating_country_iso2;
        $userCountryIso2 = session('user_country_iso2', $baseCountryIso2);

        // 3. Cargar país del usuario (con respaldo al país base)
        $userCountry = Country::where('iso2', $userCountryIso2)->first()
            ?? Country::where('iso2', $baseCountryIso2)->first();

        // Si ni siquiera el país base existe, usa un fallback mínimo
        if (!$userCountry) {
            $userCountry = (object) [
                'iso2' => 'VE',
                'currency_code' => 'VES',
                'currency_symbol' => 'Bs',
                'exchange_rate_to_usd' => 243.11,
                'currency_thousand_separator' => '.',
                'currency_decimal_separator' => ',',
                'currency_decimal_digits' => 2,
                'currency_symbol_position' => 'after',
                'locale' => 'es-VE',
            ];
        }

        // 4. userConfig con protección contra null
        $userConfig = [
            'country_iso2' => $userCountry->iso2 ?? 'VE',
            'currency_code' => $userCountry->currency_code ?? 'VES',
            'currency_symbol' => $userCountry->currency_symbol ?? 'Bs',
            'exchange_rate_to_usd' => (float) ($userCountry->exchange_rate_to_usd ?? 243.11),
            'thousand_separator' => $userCountry->currency_thousand_separator ?? '.',
            'decimal_separator' => $userCountry->currency_decimal_separator ?? ',',
            'decimal_digits' => (int) ($userCountry->currency_decimal_digits ?? 2),
            'symbol_position' => $userCountry->currency_symbol_position ?? 'after',
            'locale' => $userCountry->locale ?? 'es-VE',
        ];

        // 5. Países disponibles
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

            'appName' => $settings->site_name,

            'userConfig' => $userConfig,
            'availableCountries' => $availableCountries,
            // 'globalConfig' => app(CountryService::class)->getCountryConfig($request), // 👈 Eliminado

            'system' => [
                'site_name' => $settings->site_name,
                'logo_url' => $settings->logo_path ? asset('storage/' . $settings->logo_path) : null,
                'favicon_url' => $settings->favicon_path ? asset('storage/' . $settings->favicon_path) : null,
                'base_currency_code' => $settings->base_currency_code,
                'operating_country' => $settings->operatingCountry,
                'maintenance_mode' => $settings->maintenance_mode,
                'maintenance_message' => $settings->maintenance_message,
            ],
        ];
    }
}
