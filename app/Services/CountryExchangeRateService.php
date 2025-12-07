<?php
// app/Services/CountryExchangeRateService.php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Country;
use App\Models\GeneralSetting;

class CountryExchangeRateService
{
    private string $apiKey;
    private string $baseUrl = 'https://api.currencyfreaks.com/v2.0/rates/latest';

    public function __construct()
    {
        $this->apiKey = config('services.currencyfreaks.api_key');
    }

    /**
     * Actualiza tasas usando conversión manual (para plan gratuito)
     * La API siempre devuelve tasas con base USD.
     * Convertimos: 1 [Moneda Base] = ? [Moneda Local]
     */
    public function updateAllRates(): bool
    {
        try {
            // Obtener la moneda base del sistema
            $baseCurrency = GeneralSetting::first()?->base_currency_code ?? 'USD';

            // Obtener todas las monedas activas
            $activeCurrencies = Country::where('is_active', true)
                ->pluck('currency_code')
                ->unique()
                ->values()
                ->toArray();

            if (empty($activeCurrencies)) {
                Log::info('No hay países activos para actualizar tasas');
                return true;
            }

            // 👉 En plan gratuito, siempre pedimos tasas desde USD
            $allCurrencies = array_unique(array_merge($activeCurrencies, [$baseCurrency]));
            $response = Http::timeout(15)->get($this->baseUrl, [
                'apikey' => $this->apiKey,
                'symbols' => implode(',', $allCurrencies),
                // NOTA: No enviamos 'base' porque el plan gratuito no lo soporta
            ]);

            if (!$response->ok()) {
                $error = $response->json('message', 'Error desconocido');
                Log::error("CurrencyFreaks API error: {$error} (Status: {$response->status()})");
                return false;
            }

            $usdRates = $response->json('rates', []);

            // Calcular tasa de la moneda base a USD
            $baseToUsd = $usdRates[$baseCurrency] ?? 1.0;
            if ($baseCurrency === 'USD') {
                $baseToUsd = 1.0;
            }

            $updatedCount = 0;
            foreach (Country::where('is_active', true)->get() as $country) {
                if ($country->currency_code === $baseCurrency) {
                    // La tasa de la moneda base es siempre 1.0
                    $localRate = 1.0;
                } else {
                    // Tasa de USD a moneda local
                    $usdToLocal = $usdRates[$country->currency_code] ?? 0;
                    // Tasa de moneda base a moneda local: (USD a local) / (USD a base)
                    $localRate = $usdToLocal / $baseToUsd;
                }

                $country->update([
                    'exchange_rate_from_api' => max(0, $localRate),
                    'updated_at' => now(),
                ]);
                $updatedCount++;
            }

            Log::info("Tasas actualizadas para {$updatedCount} países (moneda base: {$baseCurrency})");
            return true;

        } catch (\Exception $e) {
            Log::error("CurrencyFreaks API exception: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Método para uso manual (frontend) - también con conversión manual
     */
    public function getExchangeRates(array $currencyCodes): array
    {
        if (empty($currencyCodes)) {
            return [];
        }

        $baseCurrency = GeneralSetting::first()?->base_currency_code ?? 'USD';
        $allCurrencies = array_unique(array_merge($currencyCodes, [$baseCurrency]));

        try {
            $response = Http::timeout(10)->get($this->baseUrl, [
                'apikey' => $this->apiKey,
                'symbols' => implode(',', $allCurrencies),
                // Sin 'base' (plan gratuito)
            ]);

            if ($response->ok()) {
                $usdRates = $response->json('rates', []);
                $baseToUsd = $usdRates[$baseCurrency] ?? 1.0;
                if ($baseCurrency === 'USD') {
                    $baseToUsd = 1.0;
                }

                $result = [];
                foreach ($currencyCodes as $code) {
                    if ($code === $baseCurrency) {
                        $result[$code] = 1.0;
                    } else {
                        $usdToLocal = $usdRates[$code] ?? 0;
                        $result[$code] = $usdToLocal / $baseToUsd;
                    }
                }
                return $result;
            }
        } catch (\Exception $e) {
            Log::warning("CurrencyFreaks API error (getExchangeRates): " . $e->getMessage());
        }

        // Fallback: devolver 1.0 para la moneda base, 0 para otras
        $fallback = [];
        foreach ($currencyCodes as $code) {
            $fallback[$code] = ($code === $baseCurrency) ? 1.0 : 0;
        }
        return $fallback;
    }
}
