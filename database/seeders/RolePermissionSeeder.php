<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\PermissionMetadata;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Crear roles
        $roles = ['super_admin', 'admin', 'proveedor', 'vendedor', 'comprador', 'anunciante'];
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // 2. Crear permisos estándar
        $permissions = [
            'view products', 'create products', 'edit own products', 'delete own products',
            'view own products', 'view all products', 'create orders', 'view own orders',
            'view all orders', 'update order status', 'view own earnings', 'view platform revenue',
            'assign roles', 'view user list', 'manage global config', 'manage countries',
            'create ads', 'view own ads', 'edit own ads'
        ];

        foreach ($permissions as $name) {
            Permission::firstOrCreate(['name' => $name]);
        }

        // 3. Crear permisos CRÍTICOS
        $criticalPermissions = [
            'view_dashboard' => 'Acceso al panel de control',
            'manage_roles' => 'Gestionar Roles',
            'manage_permissions' => 'Gestionar Permisos',
            'manage_users' => 'Gestionar Usuarios'
        ];

        foreach ($criticalPermissions as $name => $desc) {
            $perm = Permission::firstOrCreate(['name' => $name]);
            PermissionMetadata::create([
                'permission_id' => $perm->id,
                'display_name' => ucfirst(str_replace('_', ' ', $name)),
                'description' => $desc,
                'is_critical' => true,
                'category' => 'system'
            ]);
        }

        // 4. Asignar permisos a roles (¡CORREGIDO!)

        // Super Admin: TODOS los permisos
        Role::findByName('super_admin')->syncPermissions(Permission::all()->pluck('name'));

        // Admin: Todos los permisos EXCEPTO los críticos del Super Admin
        $adminPermissions = Permission::whereNotIn('name', [
            'manage_roles',        // Solo Super Admin gestiona roles
            'manage_permissions'   // Solo Super Admin gestiona permisos
        ])->pluck('name');
        Role::findByName('admin')->syncPermissions($adminPermissions);

        // Proveedor
        Role::findByName('proveedor')->syncPermissions([
            'view products', 'create products', 'edit own products', 'delete own products',
            'view own products', 'view own orders', 'view own earnings'
        ]);

        // Vendedor
        Role::findByName('vendedor')->syncPermissions([
            'view products', 'create orders', 'view own orders', 'update order status', 'view own earnings'
        ]);

        // Comprador
        Role::findByName('comprador')->syncPermissions([
            'view products', 'create orders', 'view own orders'
        ]);

        // Anunciante
        Role::findByName('anunciante')->syncPermissions([
            'create ads', 'view own ads', 'edit own ads'
        ]);

        $this->command->info('✅ Roles y permisos asignados correctamente.');
    }
}
