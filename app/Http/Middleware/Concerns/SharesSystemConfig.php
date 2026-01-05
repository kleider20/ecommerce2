<?php

namespace App\Http\Middleware\Concerns;

use App\Models\GeneralSetting;
use App\Models\Country;

trait SharesSystemConfig
{
    protected function getSystemConfig()
    {
        $settings = GeneralSetting::first();
        if (!$settings) {
            $settings = (object) [
                'site_name' => 'Mi Tienda',
                'operating_country_iso2' => 'VE',
                'base_currency_code' => 'USD',
                'active_layout_year' => '2026',
            ];
        }

        $userCountryIso2 = request()->session()->get('user_country_iso2', $settings->operating_country_iso2);
        $userCountry = Country::where('iso2', $userCountryIso2)->first() ?? (object) [
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

        $availableCountries = Country::where('is_active', true)
            ->select('name', 'iso2', 'currency_code', 'currency_symbol', 'timezone')
            ->get();

        return [
            'settings' => $settings,
            'userConfig' => $userConfig,
            'selectedCountryIso2' => $userCountryIso2,
            'availableCountries' => $availableCountries,
        ];
    }
}
