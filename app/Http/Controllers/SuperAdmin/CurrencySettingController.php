<?php
// app/Http/Controllers/SuperAdmin/CurrencySettingController.php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\GeneralSetting;
use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CountryExchangeRateService;

class CurrencySettingController extends Controller
{
    public function edit()
    {
        $settings = GeneralSetting::first();

        // 👇 1. Obtener el país de operación (usando operating_country_iso2)
        $operatingCountry = Country::where('iso2', $settings->operating_country_iso2)->first();

        // 👇 2. Obtener la tasa de conversión: prioridad a exchange_rate_from_api, sino exchange_rate_to_usd
        $localCurrencyRate = $operatingCountry?->exchange_rate_from_api
            ?? $operatingCountry?->exchange_rate_to_usd
            ?? 1.0;

        // 👇 3. Obtener el símbolo de la moneda local del país de operación
        $localCurrencySymbol = $operatingCountry?->currency_symbol ?? '$';

        // 👇 4. Obtener el símbolo de la moneda base
        $baseCurrencySymbol = Country::where('currency_code', $settings->base_currency_code)
            ->value('currency_symbol') ?? '$';

        $countries = Country::where('is_active', true)->get([
            'name', 'iso2', 'currency_code', 'currency_symbol',
            'exchange_rate_to_usd', 'exchange_rate_from_api',
            'currency_name', 'currency_symbol_position',
            'currency_thousand_separator', 'currency_decimal_separator',
            'currency_decimal_digits',
        ]);

        return Inertia::render('SuperAdmin/Settings/CurrencyEdit', [
            'settings' => $settings,
            'base_currency_code' => $settings->base_currency_code,
            'base_currency_symbol' => $baseCurrencySymbol,
            'localCurrencyCode' => $operatingCountry?->currency_code ?? 'USD',
            'localCurrencyRate' => $localCurrencyRate,
            'localCurrencySymbol' => $localCurrencySymbol,
            'countries' => $countries,
        ]);
    }

    // public function update(Request $request)
    // {
    //     $request->validate([
    //         'base_currency_code' => 'required|string|size:3|exists:countries,currency_code',
    //         'rates' => 'nullable|array',
    //         'rates.*' => 'numeric|min:0',
    //     ]);

    //     $settings = GeneralSetting::first();
    //     $settings->update([
    //         'base_currency_code' => $request->base_currency_code,
    //     ]);

    //     // ✅ Actualizar tasas en countries
    //     if ($request->filled('rates')) {
    //         foreach ($request->rates as $currencyCode => $rate) {
    //             Country::where('currency_code', $currencyCode)->update([
    //                 'exchange_rate_to_usd' => $rate,
    //             ]);
    //         }
    //     }

    //     \Cache::forget('general_settings');
    //     return back()->with('success', 'Configuración de moneda actualizada.');
    // }

    public function updateBase(Request $request)
    {
        $request->validate([
            'base_currency_code' => 'required|string|size:3|exists:countries,currency_code',
        ]);

        GeneralSetting::first()->update([
            'base_currency_code' => $request->base_currency_code,
        ]);

        return back()->with('success', 'Configuración de moneda actualizada.');
    }

    public function updateRates(Request $request)
    {
        $request->validate([
            'rates' => 'required|array',
            'rates.*' => 'numeric|min:0',
        ]);

        foreach ($request->rates as $currencyCode => $rate) {
            Country::where('currency_code', $currencyCode)->update([
                'exchange_rate_to_usd' => $rate,
            ]);
        }

        return back()->with('success', 'Configuración de tasas actualizada.');
    }

    public function fetchRates(Request $request)
    {
        $request->validate([
            'currencies' => 'required|array',
            'currencies.*' => 'string|size:3',
        ]);

        try {
            $service = new CountryExchangeRateService();
            $rates = $service->getExchangeRates($request->currencies);
            return response()->json($rates);
        } catch (\Exception $e) {
            \Log::error("API de tasas falló: " . $e->getMessage());
            return response()->json([
                'error' => 'No se pudieron obtener tasas desde la API',
            ], 500);
        }
    }
}
