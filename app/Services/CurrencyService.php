<?php

// app/Services/CurrencyService.php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class CurrencyService
{
    private string $apiKey;
    private string $baseUrl = 'https://api.currencyfreaks.com/v2.0/rates/latest';

    public function __construct()
    {
        $this->apiKey = config('services.currencyfreaks.api_key');
    }

    public function getExchangeRates(array $targetCurrencies, string $base = 'USD'): array
    {
        $key = 'currency_rates_' . md5(implode(',', $targetCurrencies) . '_' . $base);
        return Cache::remember($key, 30, function () use ($targetCurrencies, $base) {
            try {
                $symbols = implode(',', $targetCurrencies);
                $response = Http::timeout(10)
                    ->get($this->baseUrl, [
                        'apikey' => $this->apiKey,
                        'symbols' => $symbols,
                        'base' => $base,
                    ]);

                if ($response->ok()) {
                    return $response->json('rates', []);
                }
            } catch (\Exception $e) {
                \Log::warning("CurrencyFreaks API error: " . $e->getMessage());
            }

            // Fallback a tasas manuales
            $settings = \App\Models\CurrencySetting::instance();
            return array_intersect_key($settings->manual_exchange_rates, array_flip($targetCurrencies));
        });
    }
}
