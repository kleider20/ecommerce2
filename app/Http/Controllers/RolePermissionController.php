<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\Permission;

class RolePermissionController extends Controller
{
    // ✅ Usa route model binding con IDs de ruta
    public function attach(Role $role, Permission $permission)
    {
        $user = auth()->user();

        if (!$user->hasRole(['super_admin', 'admin'])) {
            abort(403);
        }

        if ($user->hasRole('admin') && $role->name === 'super_admin') {
            abort(403);
        }

        $role->givePermissionTo($permission);
        return back()->with('success', 'Permiso asignado');
    }

    public function detach(Role $role, Permission $permission)
    {
        $user = auth()->user();

        if (!$user->hasRole(['super_admin', 'admin'])) {
            abort(403);
        }

        if ($user->hasRole('admin') && $role->name === 'super_admin') {
            abort(403);
        }

        if ($user->hasRole('super_admin') && $role->name === 'super_admin') {
            abort(403, 'No puedes modificar los permisos del Super Admin');
        }

        if ($user->hasRole('admin') && $role->name === 'admin') {
            abort(403, 'No puedes modificar tus propios permisos');
        }

        $role->revokePermissionTo($permission);
        return back()->with('success', 'Permiso removido');
    }

    public function destroy(Permission $permission)
    {
        $user = auth()->user();

        if (!$user->hasRole('super_admin')) {
            abort(403);
        }

        if (!$permission->isDeletable()) {
            return back()->withErrors(['error' => 'No se puede eliminar un permiso crítico o asignado a usuarios.']);
        }

        $permission->delete();
        return back()->with('success', 'Permiso eliminado');
    }
}
