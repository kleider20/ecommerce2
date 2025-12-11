<?php

// database/seeders/ProductSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use Spatie\Permission\Models\Role;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Asegura que el rol 'proveedor' exista
        Role::firstOrCreate(['name' => 'proveedor']);

        // ✅ Asigna el rol 'proveedor' a los primeros 3 usuarios (o todos si son pocos)
        $usuarios = User::take(3)->get(); // Usa los primeros 3 usuarios
        foreach ($usuarios as $user) {
            if (!$user->hasRole('proveedor')) {
                $user->assignRole('proveedor');
            }
        }

        // ✅ Verifica categorías
        $requiredSlugs = ['computadoras', 'monitores', 'accesorios', 'ropa', 'calzados', 'hogar'];
        foreach ($requiredSlugs as $slug) {
            if (!Category::where('slug', $slug)->exists()) {
                $this->command->error("⚠️ Categoría '{$slug}' no encontrada.");
                return;
            }
        }

        // ✅ Crea 50 productos usando los usuarios existentes
        Product::factory()->count(50)->create();

        $this->command->info('✅ 50 productos creados usando usuarios existentes como proveedores.');
    }
}
