<?php
// app/Http/Controllers/DashboardController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $roles = $user->getRoleNames()->toArray();

        // Prioridad de roles (si tiene varios)
        if (in_array('super_admin', $roles)) {
            return Inertia::render('SuperAdmin/SuperAdminDashboard', [
                'user' => $user,
            ]);
        }

        if (in_array('proveedor', $roles)) {
            return Inertia::render('Provider/Dashboard', [
                'user' => $user,
                'productsCount' => $user->products()->count(),
            ]);
        }

        if (in_array('vendedor', $roles)) {
            return Inertia::render('Seller/Dashboard', [
                'user' => $user,
                'ordersCount' => $user->orders()->count(),
            ]);
        }

        if (in_array('anunciante', $roles)) {
            return Inertia::render('Advertiser/Dashboard', [
                'user' => $user,
                'adsCount' => $user->ads()->count(),
            ]);
        }

        // Por defecto: comprador
        return Inertia::render('Buyer/Dashboard', [
            'user' => $user,
            'orders' => $user->orders,
        ]);
    }
}
