<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Permission;
use App\Models\PermissionMetadata;

use Inertia\Inertia;

class PermissionController extends Controller
{
    public function create()
    {
        $this->authorizeAccess();
        return inertia('Permissions/PermissionsCreate');
    }

    public function store(Request $request)
    {
        $this->authorizeAccess();

        $request->validate([
            'name' => 'required|string|regex:/^[a-z0-9_]+$/|unique:permissions,name',
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_critical' => 'boolean',
            'category' => 'required|string|in:general,users,products,orders,settings,system',
        ]);

        // Crear el permiso base (Spatie)
        $permission = Permission::create(['name' => $request->name]);

        // Crear la metadata
        PermissionMetadata::create([
            'permission_id' => $permission->id,
            'display_name' => $request->display_name,
            'description' => $request->description,
            'is_critical' => $request->boolean('is_critical'),
            'category' => $request->category,
        ]);

        return to_route('roles.index')->with('success', 'Permiso creado exitosamente');
    }

    private function authorizeAccess()
    {
        if (!auth()->user()->hasRole('super_admin')) {
            return Inertia::render('Errors/403');
            // abort(403, 'Solo el Super Admin puede crear permisos.');
        }
    }
}
