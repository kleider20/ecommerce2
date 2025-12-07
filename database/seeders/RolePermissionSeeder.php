<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        // Limpiar caché de permisos
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();


        // // create permissions
        // Permission::create(['name' => 'edit articles']);

        // ───────────────────────────────
        // 1. Crear roles
        // ───────────────────────────────
        $roles = ['super_admin', 'proveedor', 'vendedor', 'comprador', 'anunciante'];
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // ───────────────────────────────
        // 2. Definir y crear permisos
        // ───────────────────────────────
        $permissions = [
            // Productos
            'view products',
            'create products',
            'edit own products',
            'delete own products',
            'view own products',
            'view all products',

            // Pedidos
            'create orders',
            'view own orders',
            'view all orders',
            'update order status',

            // Finanzas
            'view own earnings',
            'view platform revenue',

            // Usuarios
            'assign roles',
            'view user list',

            // Configuración
            'manage global config',
            'manage countries',

            // Anuncios
            'create ads',
            'view own ads',
            'edit own ads',
        ];

        foreach (array_unique($permissions) as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ───────────────────────────────
        // 3. Asignar permisos a roles
        // ───────────────────────────────
        Role::findByName('super_admin')->givePermissionTo(Permission::all());

        Role::findByName('proveedor')->givePermissionTo([
            'view products',
            'create products',
            'edit own products',
            'delete own products',
            'view own products',
            'view own orders',
            'view own earnings',
        ]);

        Role::findByName('vendedor')->givePermissionTo([
            'view products',
            'create orders',
            'view own orders',
            'update order status',
            'view own earnings',
        ]);

        Role::findByName('comprador')->givePermissionTo([
            'view products',
            'create orders',
            'view own orders',
        ]);

        Role::findByName('anunciante')->givePermissionTo([
            'create ads',
            'view own ads',
            'edit own ads',
        ]);
    }
}
