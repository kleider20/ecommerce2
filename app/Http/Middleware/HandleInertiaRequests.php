<?php
// app/Http/Middleware/HandleInertiaRequests.php
namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Http\Middleware\Concerns\SharesSystemConfig;
use App\Http\Middleware\Concerns\SharesAuthData;
use App\Http\Middleware\Concerns\SharesNotifications;
use App\Http\Middleware\Concerns\SharesLayoutConfig;

class HandleInertiaRequests extends Middleware
{
    use SharesSystemConfig, SharesAuthData, SharesNotifications, SharesLayoutConfig;

    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        // 👇 Configuración del sistema
        $system = $this->getSystemConfig();
        $settings = $system['settings'];

        // 👇 Datos de autenticación
        $auth = $this->getAuthData();
        $authUser = $auth['authUser'];
        $userRole = $auth['userRole'];

        // 👇 Notificaciones (solo si hay usuario)
        $notificationsData = ['globalNotifications' => [], 'unreadGlobalNotificationsCount' => 0];
        if ($authUser) {
            $notificationsData = $this->getNotificationsData($authUser->id);
        }

        // 👇 Layout Config (pasa el request al trait)
        $layoutConfig = $this->getLayoutConfigData($request);

        return array_merge(
            parent::share($request),
            [
                'auth' => $authUser ? [
                    'user' => [
                        'id' => $authUser->id,
                        'name' => $authUser->name,
                        'email' => $authUser->email,
                        'avatar' => $authUser->avatar,
                        'roles' => $authUser->getRoleNames()->toArray(),
                        'permissions' => $authUser->getAllPermissions()->pluck('name')->toArray(),
                        'profile' => $auth['profileData'],
                    ]
                ] : null,

                'appName' => $settings->site_name ?? 'Mi Tienda',
                'userConfig' => $system['userConfig'],
                'selectedCountryIso2' => $system['selectedCountryIso2'],
                'availableCountries' => $system['availableCountries'],
                'system' => [
                    'site_name' => $settings->site_name ?? 'Mi Tienda',
                    'logo_url' => null,
                    'favicon_url' => null,
                    'base_currency_code' => $settings->base_currency_code ?? 'USD',
                    'maintenance_mode' => $settings->maintenance_mode ?? false,
                    'maintenance_message' => $settings->maintenance_message,
                ],
                'layoutYear' => $settings->active_layout_year ?? '2026',
                'userRole' => $userRole,

                // 👇 Notificaciones
                'globalNotifications' => $notificationsData['globalNotifications'],
                'unreadGlobalNotificationsCount' => $notificationsData['unreadGlobalNotificationsCount'],
            ],
            // 👇 Layout Config - TODO EN UN SOLO BLOQUE (MUCHO MÁS LIMPIO)
            $layoutConfig
        );
    }
}
