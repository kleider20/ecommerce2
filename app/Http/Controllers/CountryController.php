<?php

namespace App\Http\Controllers;

use App\Models\Country; // ← Asegúrate de usar "Country", no "GlobalConfig"
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class CountryController extends Controller
{
    /* public function setCountry(Request $request)
    {
        $request->validate(['country_code' => 'required|alpha|size:2']);

        $code = strtoupper($request->country_code);

        // Verifica que el país exista y esté activo
        $country = Country::where('iso2', $code)
                          ->where('is_active', true)
                          ->firstOrFail();

        // Guarda la preferencia
        if (Auth::check()) {
            Auth::user()->update(['preferred_country' => $code]);
        } else {
            $request->session()->put('user_country', $code);
        }

        // Redirige a la URL actual para recargar con la nueva config
        return redirect()->back();
    } */

    public function index()
    {
        return Country::where('is_active', true)
            ->select('id', 'name', 'iso2')
            ->get();
    }

    public function states($countryId)
    {
        return Country::findOrFail($countryId)
            ->states()
            ->select('id', 'name')
            ->get();
    }

    public function setCountry(Request $request)
    {
        $request->validate([
            'country_code' => 'required|string|size:2|exists:countries,iso2',
        ]);

        Session::put('user_country_iso2', $request->country_code);

        return back();
    }

    public function getAvailableCountries()
    {
        return Country::where('is_active', true)
            ->select('id', 'name', 'iso2', 'currency_code', 'currency_symbol', 'exchange_rate_to_usd')
            ->get();
    }
}
