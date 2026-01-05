<?php
// app/Http/Controllers/DashboardController.php
namespace App\Http\Controllers;

use App\Models\GeneralSetting;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // Mapa de roles → componentes de layout
    protected $roleViews = [
        'super_admin' => 'SuperAdmin/SuperAdminDashboard',
        'user'        => 'Users/UserDashboard',
        // 'proveedor'   => 'Provider/Dashboard',
        // 'vendedor'    => 'Seller/Dashboard',
        // 'anunciante'  => 'Advertiser/Dashboard',
    ];

    public function index(Request $request)
    {
        $user = $request->user();
        $roles = $user->getRoleNames()->toArray();

        $mainRole = $this->determineMainRole($roles);
        $component = $this->roleViews[$mainRole] ?? 'Dashboard';

        // 🔑 Obtener el año activo desde tu modelo real
        $currentYear = GeneralSetting::first()->active_layout_year ?? '2026';

        return Inertia::render($component, array_merge(
            $this->getPageData($user, $mainRole),
            ['layoutYear' => $currentYear, 'userRole' => $mainRole]
        ));
    }

    protected function determineMainRole(array $roles): string
    {
        $priority = ['super_admin', 'user', 'proveedor', 'vendedor', 'anunciante'];
        foreach ($priority as $role) {
            if (in_array($role, $roles)) {
                return $role;
            }
        }
        return 'comprador'; // default
    }

    // // app/Http/Controllers/DashboardController.php

    // protected function getPageData($user, string $role): array
    // {
    //     $data = ['user' => $user];

    //     switch ($role) {
    //         case 'proveedor':
    //             $data['productsCount'] = $user->products()->count();
    //             break;
    //         case 'vendedor':
    //             $data['ordersCount'] = $user->orders()->count();
    //             break;
    //         case 'anunciante':
    //             $data['adsCount'] = $user->ads()->count();
    //             break;
    //         default: // ← Esto incluye 'user' y 'comprador'
    //             // Datos específicos para el dashboard de usuario
    //             $data['stats'] = [
    //                 'totalOrders' => $user->orders()->count(),
    //                 'totalSpent' => '$2,450', // ← Calcula esto dinámicamente si es posible
    //                 'pendingOrders' => 2,     // ← Obtén del modelo si es necesario
    //                 'wishlistItems' => 8,     // ← Asume relación 'wishlist'
    //             ];
    //             $data['quickActions'] = [
    //                 ['label' => 'Seguimiento', 'icon' => 'Package'],
    //                 ['label' => 'Favoritos', 'icon' => 'Heart'],
    //                 ['label' => 'Direcciones', 'icon' => 'MapPin'],
    //                 ['label' => 'Pago', 'icon' => 'CreditCard'],
    //             ];
    //             // Asume que tienes una relación 'notifications' en tu modelo User
    //             $data['notifications'] = $user->notifications ?? collect();
    //             break;
    //     }

    //     return $data;
    // }

    // app/Http/Controllers/DashboardController.php

    protected function getPageData($user, string $role): array
    {
        // ✅ Serializa el usuario manualmente
        $serializedUser = [
            'id' => (int) $user->id, // 🔑 ¡Fuerza a número!
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            // Añade otros campos que necesites
        ];

        $data = ['user' => $serializedUser];

        switch ($role) {
            case 'proveedor':
                $data['productsCount'] = 15; // Datos ficticios
                break;
            case 'vendedor':
                $data['ordersCount'] = 24; // Datos ficticios
                break;
            case 'anunciante':
                $data['adsCount'] = 3; // Datos ficticios
                break;
            default: // Rol 'user' o 'comprador'
                $data['stats'] = [
                    'totalOrders' => 24,
                    'totalSpent' => '$2,450',
                    'pendingOrders' => 2,
                    'wishlistItems' => 8,
                ];
                $data['quickActions'] = [
                    ['label' => 'Seguimiento', 'icon' => 'Package'],
                    ['label' => 'Favoritos', 'icon' => 'Heart'],
                    ['label' => 'Direcciones', 'icon' => 'MapPin'],
                    ['label' => 'Pago', 'icon' => 'CreditCard'],
                ];
                // Notificaciones ficticias
                // $data['notifications'] = [
                //     ['id' => 1, 'message' => 'Tu pedido #1234 ha sido enviado', 'type' => 'order', 'time' => 'Hace 2 horas', 'read' => false],
                //     ['id' => 2, 'message' => '¡Nuevas ofertas en electrónica!', 'type' => 'promotion', 'time' => 'Hace 1 día', 'read' => true],
                // ];
                // $data['notifications'] = $user->unreadNotifications()
                //     ->limit(20)
                //     ->get()
                //     ->map(fn($n) => [
                //         'id' => $n->id,
                //         'type' => $n->type,
                //         'message' => $n->message,
                //         'time' => $n->created_at->diffForHumans(),
                //         'read' => $n->is_read,
                //         'action_url' => $n->action_url,
                //     ])->all();
                break;
        }

        return $data;
    }
}
