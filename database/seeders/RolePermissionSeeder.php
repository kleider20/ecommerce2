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
        $roles = ['super_admin', 'admin', 'proveedor', 'vendedor', 'user'];
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // 2. Definir permisos POR ROL
        $rolePermissions = [
            'admin' => [
                'normal' => [
                    ['name' => 'view_products', 'display_name' => 'Ver Productos', 'description' => 'Acceso a la lista de productos', 'category' => 'products'],
                    ['name' => 'create_products', 'display_name' => 'Crear Productos', 'description' => 'Acceso a la creación de productos', 'category' => 'products'],
                    ['name' => 'view_users', 'display_name' => 'Ver Usuarios', 'description' => 'Acceso a la lista de usuarios', 'category' => 'users'],
                ],
                'critical' => [
                    ['name' => 'manage_accounts', 'display_name' => 'Gestor de Cuentas', 'description' => 'Gestor de cuentas de usuarios', 'category' => 'system'],
                ]
            ],
            //Permisos de Usuarios
            'user' => [
                'normal' => [
                    ['name' => 'view_products', 'display_name' => 'Ver Productos', 'description' => 'Acceso a la lista de productos', 'category' => 'products'],
                    ['name' => 'view_profile', 'display_name' => 'Ver Perfil', 'description' => 'Acceso al perfil', 'category' => 'users'],
                ],
                'critical' => [
                    ['name' => 'view_dashboard', 'display_name' => 'Dashboard', 'description' => 'Acceso al Dashboard', 'category' => 'system'],
                ]
            ],

            'proveedor' => [
                'normal' => [
                    ['name' => 'view_own_products', 'display_name' => 'Ver Mis Productos', 'description' => 'Ver solo sus productos', 'category' => 'products'],
                    ['name' => 'create_products', 'display_name' => 'Crear Productos', 'description' => 'Crear nuevos productos', 'category' => 'products'],
                ],
                'critical' => [
                    ['name' => 'manage_own_catalog', 'display_name' => 'Gestionar Catálogo', 'description' => 'Administrar su catálogo completo', 'category' => 'products'],
                ]
            ],
            'vendedor' => [
                'normal' => [
                    ['name' => 'view_products', 'display_name' => 'Ver Productos', 'description' => 'Ver catálogo público', 'category' => 'products'],
                    ['name' => 'create_orders', 'display_name' => 'Crear Pedidos', 'description' => 'Realizar ventas', 'category' => 'orders'],
                ],
                'critical' => [
                    ['name' => 'view_own_earnings', 'display_name' => 'Ver Ganancias', 'description' => 'Acceso a comisiones', 'category' => 'finance'],
                ]
            ],
            // 'comprador' => [
            //     'normal' => [
            //         ['name' => 'view_products', 'display_name' => 'Ver Productos', 'description' => 'Navegar catálogo', 'category' => 'products'],
            //         ['name' => 'create_orders', 'display_name' => 'Comprar Productos', 'description' => 'Realizar compras', 'category' => 'orders'],
            //     ],
            //     'critical' => []
            // ],
            // 'anunciante' => [
            //     'normal' => [
            //         ['name' => 'create_ads', 'display_name' => 'Crear Anuncios', 'description' => 'Diseñar campañas', 'category' => 'marketing'],
            //         ['name' => 'view_own_ads', 'display_name' => 'Ver Mis Anuncios', 'description' => 'Monitorear campañas', 'category' => 'marketing'],
            //     ],
            //     'critical' => [
            //         ['name' => 'manage_ad_budget', 'display_name' => 'Gestionar Presupuesto', 'description' => 'Ajustar inversión publicitaria', 'category' => 'finance'],
            //     ]
            // ]
        ];

        // 3. Definir PERMISOS COMPARTIDOS (asignados a varios roles específicos)
        $sharedPermissions = [
            'view_profile' => ['admin', 'proveedor', 'vendedor', 'user'],
            'view_dashboard' => ['admin', 'proveedor', 'vendedor', 'user'],
            // 'edit_profile' => ['admin', 'proveedor', 'vendedor', 'comprador', 'anunciante', 'user'],
        ];

        // 4. Definir PERMISOS GLOBALES (solo para super_admin)
        $globalPermissions = [
            ['name' => 'manage_roles_permissions', 'display_name' => 'Gestionar Roles y Permisos', 'description' => 'Crear, Modificar, Administrar roles y permisos del sistema', 'category' => 'system'],
            // ['name' => 'view_all_revenue', 'display_name' => 'Ver Ingresos Totales', 'description' => 'Acceso a reportes financieros globales', 'category' => 'finance'],
            ['name' => 'manage_global_config', 'display_name' => 'Configuración Global', 'description' => 'Ajustar parámetros del sitio', 'category' => 'system'],
        ];

        // 5. Crear todos los permisos y metadatos
        $allPermissionNames = [];

        // 5.1 Permisos por rol
        foreach ($rolePermissions as $roleName => $perms) {
            foreach (array_merge($perms['normal'], $perms['critical']) as $permData) {
                $perm = Permission::firstOrCreate(['name' => $permData['name']]);
                $allPermissionNames[] = $permData['name'];

                PermissionMetadata::updateOrCreate(
                    ['permission_id' => $perm->id],
                    [
                        'display_name' => $permData['display_name'],
                        'description' => $permData['description'],
                        'category' => $permData['category'],
                        'is_critical' => in_array($permData, $perms['critical']),
                    ]
                );
            }
        }

        // 5.2 Permisos globales
        foreach ($globalPermissions as $permData) {
            $perm = Permission::firstOrCreate(['name' => $permData['name']]);
            $allPermissionNames[] = $permData['name'];

            PermissionMetadata::updateOrCreate(
                ['permission_id' => $perm->id],
                [
                    'display_name' => $permData['display_name'],
                    'description' => $permData['description'],
                    'category' => $permData['category'],
                    'is_critical' => true,
                ]
            );
        }

        // 6. Asignar permisos a roles específicos
        foreach ($rolePermissions as $roleName => $perms) {
            $role = Role::findByName($roleName);
            $rolePermissionNames = array_column(array_merge($perms['normal'], $perms['critical']), 'name');
            $role->syncPermissions($rolePermissionNames);
        }

        // 7. Asignar PERMISOS COMPARTIDOS (si los defines)
        foreach ($sharedPermissions as $permName => $rolesToAssign) {
            $perm = Permission::firstOrCreate(['name' => $permName]);
            $allPermissionNames[] = $permName;

            PermissionMetadata::updateOrCreate(
                ['permission_id' => $perm->id],
                [
                    'display_name' => ucfirst(str_replace('_', ' ', $permName)),
                    'description' => "Permiso compartido: $permName",
                    'category' => 'shared',
                    'is_critical' => false,
                ]
            );

            foreach ($rolesToAssign as $roleName) {
                $role = Role::findByName($roleName);
                if (!$role->hasPermissionTo($permName)) {
                    $role->givePermissionTo($perm);
                }
            }
        }

        // 8. Asignar TODOS los permisos al super_admin
        $superAdmin = Role::findByName('super_admin');
        $superAdmin->syncPermissions(array_unique($allPermissionNames));
    }
}
