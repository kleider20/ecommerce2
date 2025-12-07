<?php

namespace App\Http\Controllers;

use App\Models\Country; // ← Asegúrate de usar "Country", no "GlobalConfig"
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CountryController extends Controller
{
    public function setCountry(Request $request)
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
    }
}
