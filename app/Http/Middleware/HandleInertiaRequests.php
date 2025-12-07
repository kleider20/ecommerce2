<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

use Illuminate\Support\Facades\Auth;

use App\Services\CountryService;
use App\Models\GeneralSetting;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = GeneralSetting::current();

        // Obtiene el nombre de tu tienda desde la base de datos
        $siteName = GeneralSetting::current()->site_name;

        return [
            ...parent::share($request),
            /* 'auth' => [
                'user' => $request->user(),
            ], */

            'auth' => [
                'user' => Auth::user() ? [
                    'id' => Auth::id(),
                    'name' => Auth::user()->name,
                    'roles' => Auth::user()->getRoleNames()->toArray(),
                    'permissions' => Auth::user()->getPermissionNames()->toArray(),
                ] : null,
            ],


            'appName' => $siteName,
            'globalConfig' => app(CountryService::class)->getCountryConfig($request),


            'system' => [
                'site_name' => $siteName,
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
