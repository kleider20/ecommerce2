<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Role;
use Inertia\Inertia;
use App\Models\Permission;
use App\Models\RoleMetadata;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
   public function index()
    {
        $user = Auth::user();

        // ✅ Verificar si el usuario tiene el permiso requerido
        if (!$user->hasPermissionTo('manage_roles_permissions')) {
            // 👇 Renderizar la página de error 403 personalizada de Inertia
            return Inertia::render('Errors/403');
        }

        // ✅ Cargar roles (excluir super_admin si es admin)
        $roles = Role::with('metadata')->get();
        if ($user->hasRole('admin')) {
            $roles = $roles->reject(fn($role) => $role->name === 'super_admin');
        }

        // ✅ Cargar permisos
        $permissions = Permission::with('metadata')->get();

        return Inertia::render('Roles/RolesIndex', [
            'roles' => $roles,
            'permissions' => $permissions,
            'authUser' => $user,
        ]);
    }

    public function create()
    {
        $user = auth()->user();
        if (!$user->hasRole('super_admin')) {
            abort(403);
        }
        return Inertia::render('Roles/RolesCreate');
    }

        // app/Http/Controllers/RoleController.php
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|regex:/^[a-z_]+$/|unique:roles,name',
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'required|string',
            'icon' => 'required|string',
            'show_in_register' => 'boolean',
        ]);

        $role = Role::create(['name' => $request->name]);

        RoleMetadata::create([
            'role_id' => $role->id,
            'display_name' => $request->display_name,
            'description' => $request->description,
            'color' => $request->color,
            'icon' => $request->icon,
            'show_in_register' => $request->show_in_register ?? false,
        ]);

        return to_route('roles.index')->with('success', 'Rol creado exitosamente');
    }

    public function toggleRegister(Request $request, Role $role)
    {
        $user = auth()->user();

        if (!$user->hasRole('super_admin')) {
            abort(403);
        }

        // $role->update([
        //     'show_in_register' => !$role->show_in_register
        // ]);

        $metadata = $role->metadata()->firstOrCreate([
            'role_id' => $role->id
        ]);
        $metadata->update([
            'show_in_register' => !$metadata->show_in_register
        ]);

        /* // ✅ Devuelve la vista actualizada con los roles actualizados
        $user = auth()->user();
        $roles = \App\Models\Role::with('metadata')->get();
        if ($user->hasRole('admin')) {
            $roles = $roles->reject(fn($r) => $r->name === 'super_admin');
        }

        return Inertia::render('Roles/RolesIndex', [
            'roles' => $roles,
            'permissions' => Permission::with('metadata')->get(),
            'authUser' => $user,
        ]); */

        return back()->with('success', 'Configuración actualizada');
    }

    // En el método edit
    public function edit(Role $role)
    {
        $user = auth()->user();

        // Solo super_admin puede editar cualquier rol
        // Admin no puede editar super_admin ni su propio rol
        if (!$user->hasRole('super_admin')) {
            abort(403);
        }

        return inertia('Roles/RolesEdit', [
            'role' => $role,
            'iconOptions' => $this->getIconOptions(),
            'colorOptions' => $this->getColorOptions(),
        ]);
    }

    // En el método update
    public function update(Request $request, Role $role)
    {
        if (!auth()->user()->hasRole('super_admin')) {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|regex:/^[a-z_]+$/|unique:roles,name,' . $role->id,
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'required|string',
            'icon' => 'required|string',
            'show_in_register' => 'boolean',
        ]);

        $role->update(['name' => $request->name]);

        $role->metadata()->updateOrCreate(
            ['role_id' => $role->id],
            [
                'display_name' => $request->display_name,
                'description' => $request->description,
                'color' => $request->color,
                'icon' => $request->icon,
                'show_in_register' => $request->show_in_register ?? false,
            ]
        );

        return to_route('roles.index')->with('success', 'Rol actualizado exitosamente');
    }

    public function destroy(Role $role)
    {
        $user = auth()->user();

        // Solo super_admin puede eliminar roles
        if (!$user->hasRole('super_admin')) {
            abort(403, 'Solo el Super Admin puede eliminar roles.');
        }

        // Proteger el rol super_admin
        if ($role->name === 'super_admin') {
            abort(403, 'No se puede eliminar el rol Super Admin.');
        }

        // Proteger el rol admin si no hay otros admins
        if ($role->name === 'admin') {
            $adminCount = \Spatie\Permission\Models\Role::findByName('admin')
                ->users()
                ->count();
            if ($adminCount <= 1) {
                abort(403, 'No se puede eliminar el último administrador del sistema.');
            }
        }

        // Verificar si el rol tiene usuarios asignados
        if ($role->users()->count() > 0) {
            return back()->withErrors([
                'error' => 'No se puede eliminar el rol "' . $role->display_name . '" porque tiene usuarios asignados.
                            Primero reasigna o elimina los usuarios de este rol.'
            ]);
        }

        // Eliminar el rol y su metadata
        $roleName = $role->display_name;
        $role->metadata?->delete(); // Elimina metadata si existe
        $role->delete();

        return to_route('roles.index')->with('success', "El rol \"$roleName\" ha sido eliminado exitosamente.");
    }

    // Nuevos métodos auxiliares
    private function getIconOptions()
    {
        return [
            ['value' => 'Shield', 'label' => 'Escudo'],
            ['value' => 'Users', 'label' => 'Usuarios'],
            ['value' => 'Key', 'label' => 'Llave'],
            ['value' => 'Globe', 'label' => 'Globo'],
            ['value' => 'Package', 'label' => 'Paquete'],
            ['value' => 'Building2', 'label' => 'Edificio'],
            ['value' => 'User', 'label' => 'Usuario'],
            ['value' => 'Crown', 'label' => 'Corona'],
            ['value' => 'Bike', 'label' => 'Bicicleta'],
            ['value' => 'Truck', 'label' => 'Camion'],

        ];
    }

    private function getColorOptions()
    {
        return [
            ['value' => 'bg-blue-100 text-blue-800', 'label' => 'Azul'],
            ['value' => 'bg-green-100 text-green-800', 'label' => 'Verde'],
            ['value' => 'bg-red-100 text-red-800', 'label' => 'Rojo'],
            ['value' => 'bg-purple-100 text-purple-800', 'label' => 'Púrpura'],
            ['value' => 'bg-indigo-100 text-indigo-800', 'label' => 'Índigo'],
            ['value' => 'bg-yellow-100 text-yellow-800', 'label' => 'Amarillo'],
            ['value' => 'bg-pink-100 text-pink-800', 'label' => 'Rosa'],
            ['value' => 'bg-gray-100 text-gray-800', 'label' => 'Gris'],
        ];
    }
}
