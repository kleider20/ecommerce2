<?php
// app/Http/Controllers/DashboardController.php
namespace App\Http\Controllers;

use App\Models\GeneralSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $roles = $user->getRoleNames()->toArray();
        $mainRole = $this->determineMainRole($roles);

        // 🔑 Obtener el año activo desde tu modelo real
        $currentYear = GeneralSetting::first()->active_layout_year ?? '2026';

        // ✅ Datos específicos por rol (sin componentes hardcodeados)
        $pageData = $this->getPageData($user, $mainRole);

        // ✅ Renderiza SIEMPRE el mismo nombre de página
        // El AutoLayoutResolver se encargará de aplicar el layout correcto
        return Inertia::render('Dashboard/Dashboard', array_merge(
            $pageData,
            [
                'layoutYear' => $currentYear,
                'userRole' => $mainRole,
                'authUser' => $user // Asegúrate de pasar el usuario completo
            ]
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
        return 'comprador';
    }

    protected function getPageData($user, string $role): array
    {
        // ✅ Serializa el usuario manualmente
        $serializedUser = [
            'id' => (int) $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'roles' => $user->getRoleNames()->toArray(),
            'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
        ];

        $data = ['user' => $serializedUser];

        switch ($role) {
            case 'proveedor':
                $data['productsCount'] = 15;
                break;
            case 'vendedor':
                $data['ordersCount'] = 24;
                break;
            case 'anunciante':
                $data['adsCount'] = 3;
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
                break;
        }

        return $data;
    }
}
