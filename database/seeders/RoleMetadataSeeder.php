<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Role;
use App\Models\RoleMetadata;


class RoleMetadataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'super_admin' => [
                'display_name' => 'Super Admin',
                'description' => 'Acceso total al sistema',
                'color' => 'bg-red-100 text-red-800',
                'icon' => 'Crown',
                'show_in_register' => false,
            ],
            'admin' => [
                'display_name' => 'Admin',
                'description' => 'Acceso total al sistema',
                'color' => 'bg-red-100 text-red-800',
                'icon' => 'Crown',
                'show_in_register' => false,
            ],
            'comprador' => [
                'display_name' => 'Comprador',
                'description' => 'Compra productos en la plataforma',
                'color' => 'bg-blue-100 text-blue-800',
                'icon' => 'User',
            ],
            'proveedor' => [
                'display_name' => 'Proveedor',
                'description' => 'Registra y vende sus productos',
                'color' => 'bg-green-100 text-green-800',
                'icon' => 'Package',
            ],
            'vendedor' => [
                'display_name' => 'Vendedor',
                'description' => 'Promueve productos y gana comisiones',
                'color' => 'bg-purple-100 text-purple-800',
                'icon' => 'Building2',
            ],
            'anunciante' => [
                'display_name' => 'Anunciante',
                'description' => 'Realiza entregas y gana por servicio',
                'color' => 'bg-orange-100 text-orange-800',
                'icon' => 'Bike',
            ],
            // 'delivery' => [
            //     'display_name' => 'Repartidor',
            //     'description' => 'Realiza entregas y gana por servicio',
            //     'color' => 'bg-orange-100 text-orange-800',
            //     'icon' => 'Bike',
            // ],
            // 'advertiser' => [
            //     'display_name' => 'Publicista',
            //     'description' => 'Publicita en la plataforma',
            //     'color' => 'bg-indigo-100 text-indigo-800',
            //     'icon' => 'Megaphone',
            // ],
        ];

        foreach ($roles as $name => $data) {
            $role = Role::findByName($name);
            if ($role) {
                RoleMetadata::updateOrCreate(
                    ['role_id' => $role->id],
                    $data
                );
            }
        }
    }
}
