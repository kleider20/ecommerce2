<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\GeoService;
use Inertia\Inertia;

use App\Models\Country;

use App\Models\Product;

class HomeController extends Controller
{
   public function index(Request $request, GeoService $geoService)
    {

        // // Productos públicos: todos los activos de todos los proveedores
        // $products = Product::with('user') // opcional: para mostrar nombre del proveedor
        //     ->where('is_active', true)
        //     ->where('in_stock', true)
        //     ->select([
        //         'id', 'name', 'description', 'category',
        //         'price_usd', 'image_url', 'in_stock'
        //     ])
        //     ->get();

        $products = Product::with('category')->where('is_active', true)->where('in_stock', true)->get(); // Asegúrate de que haya datos


        $globalConfig = $geoService->getConfigForUser($request);

        return Inertia::render('Home', [

            'products' => $products,

            'globalConfig' => $globalConfig->toFrontendArray(),
            'availableCountries' => Country::active()->orderBy('name')->get([
                'iso2', 'name'
            ]),

        ]);
    }

    /* public function setCountry(Request $request)
    {
        $request->validate(['country_code' => 'required|size:2']);
        $request->session()->put('user_country', strtoupper($request->country_code));
        return back();
    } */
}
