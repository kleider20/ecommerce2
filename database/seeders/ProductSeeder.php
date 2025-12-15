<?php

// database/seeders/ProductSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // 1. Asegurar que el rol 'proveedor' exista
        $proveedorRole = Role::firstOrCreate(['name' => 'proveedor']);

        // 2. ✅ Crear 10 usuarios FALSOS específicamente para pruebas (no afectan a usuarios reales)
        $fakeUsers = [];
        for ($i = 1; $i <= 10; $i++) {
            $email = "proveedor{$i}@falso.com";
            $user = User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => "Proveedor Falso {$i}",
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ]
            );

            // Asignar SOLO el rol 'proveedor' si no lo tiene
            if (!$user->hasRole('proveedor')) {
                $user->assignRole('proveedor');
            }

            $fakeUsers[] = $user;
        }

        // 3. Verificar categorías
        $requiredSlugs = ['computadoras', 'monitores', 'accesorios', 'ropa', 'calzados', 'hogar'];
        foreach ($requiredSlugs as $slug) {
            if (!Category::where('slug', $slug)->exists()) {
                $this->command->error("⚠️ Categoría '{$slug}' no encontrada.");
                return;
            }
        }

        // 4. ✅ Crear productos asignados SOLO a usuarios falsos
        Product::factory()
            ->count(50)
            ->create([
                'user_id' => fn() => $fakeUsers[array_rand($fakeUsers)]->id,
            ]);

        $this->command->info('✅ 10 usuarios falsos y 50 productos creados para pruebas.');
    }
}
