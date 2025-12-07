<?php
// app/Services/GeoService.php
namespace App\Services;

use App\Models\Country; // ← Usa Country, no GlobalConfig
use Illuminate\Http\Request;

class GeoService
{
    public function detectUserCountry(Request $request): string
    {
        if ($request->session()->has('user_country')) {
            return $request->session()->get('user_country');
        }

        $ip = $request->ip();
        $countryCode = $this->getCountryFromIp($ip);

        if (! $countryCode || ! Country::findByIso2($countryCode)) {
            $countryCode = 'VE';
        }

        $request->session()->put('suggested_country', $countryCode);
        return $countryCode;
    }

    private function getCountryFromIp(string $ip): ?string
    {
        if (app()->environment('local')) {
            $url = "http://ip-api.com/json/{$ip}?fields=countryCode&lang=es";
            $response = @file_get_contents($url);
            if ($response) {
                $data = json_decode($response, true);
                return $data['countryCode'] ?? null;
            }
        }
        return null;
    }

    public function getConfigForUser(Request $request): Country
    {
        if ($request->session()->has('user_country')) {
            $config = Country::findByIso2($request->session()->get('user_country'));
            if ($config) return $config;
        }

        $suggested = $request->session()->get('suggested_country', 'VE');
        return Country::findByIso2($suggested) ?? Country::first() ?? Country::factory()->make();
    }
}
