<?php

// app/Services/CountryService.php
namespace App\Services;

use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CountryService
{
    public function resolveCountryCode(Request $request): string
    {
        // 1. Si el usuario eligió un país, úsalo
        if (Auth()->check() && Auth()->user()->preferred_country) {
            return Auth()->user()->preferred_country;
        }

        if ($request->session()->has('user_country')) {
            return $request->session()->get('user_country');
        }

        // 2. Si no, usa el primero activo (ej: Venezuela)
        return Country::where('iso2', 'VE')->value('iso2') ?? 'US';
    }

    public function getCountryConfig(Request $request): array
{
    $code = 'VE'; // por defecto

    if (Auth::check() && Auth::user()->preferred_country) {
        $code = Auth::user()->preferred_country;
    } elseif ($request->session()->has('user_country')) {
        $code = $request->session()->get('user_country');
    }

    $country = Country::where('iso2', $code)->first() ?? Country::first();

    return $country ? $country->toFrontendArray() : [];
}
}
