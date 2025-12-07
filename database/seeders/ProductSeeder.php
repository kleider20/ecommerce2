<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use App\Models\Category; // 👈 Importa Category
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Asegúrate de que el rol 'proveedor' exista
        Role::firstOrCreate(['name' => 'proveedor']);

        // Crear proveedores
        $proveedores = [
            ['name' => 'TechPro Venezuela', 'email' => 'techpro@proveedor.com'],
            ['name' => 'Moda Caribe', 'email' => 'modacaribe@proveedor.com'],
            ['name' => 'Hogar & Más', 'email' => 'hogarymas@proveedor.com'],
        ];

        $usuariosProveedores = [];
        foreach ($proveedores as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'email_verified_at' => now(),
                    'password' => Hash::make('proveedor123'),
                ]
            );
            if (!$user->hasRole('proveedor')) {
                $user->assignRole('proveedor');
            }
            $usuariosProveedores[] = $user;
        }

        // 🔴 CORRECCIÓN CLAVE: Obtener IDs reales de categorías por SLUG
        $categoryIdMap = [
            'computadoras' => Category::where('slug', 'computadoras')->value('id'),
            'monitores'    => Category::where('slug', 'monitores')->value('id'),
            'accesorios'   => Category::where('slug', 'accesorios')->value('id'),
            'ropas'        => Category::where('slug', 'ropa')->value('id'), // ¡verifica el slug!
            'calzados'     => Category::where('slug', 'calzados')->value('id'),
            'hogar'        => Category::where('slug', 'hogar')->value('id'),
        ];

        // Validar que todas las categorías existan
        foreach ($categoryIdMap as $slug => $id) {
            if (!$id) {
                $this->command->error("⚠️ Categoría con slug '{$slug}' no encontrada. Ejecuta CategorySeeder primero.");
                return;
            }
        }

        $productos = [
            // Tecnología
            [
                'user_id' => $usuariosProveedores[0]->id,
                'name' => 'Laptop Gaming ASUS ROG Strix',
                'description' => 'Potente laptop para gaming y edición con RTX 4070, 32GB RAM, SSD 2TB.',
                'category_id' => $categoryIdMap['computadoras'], // ✅
                'price_usd' => 1299.99,
                'stock' => 15,
                'in_stock' => 1,
                'image_url' => 'https://placehold.co/600x400/3b82f6/white?text=Laptop+Gaming',
            ],
            [
                'user_id' => $usuariosProveedores[0]->id,
                'name' => 'Monitor 4K 27" LG UltraFine',
                'description' => 'Monitor 4K con HDR10, 144Hz, ideal para diseño y gaming.',
                'category_id' => $categoryIdMap['monitores'], // ✅
                'price_usd' => 349.99,
                'stock' => 8,
                'in_stock' => 1,
                'image_url' => 'https://placehold.co/600x400/8b5cf6/white?text=Monitor+4K',
            ],
            [
                'user_id' => $usuariosProveedores[0]->id,
                'name' => 'Teclado Mecánico Logitech G Pro',
                'description' => 'Teclado mecánico RGB con switches GX Brown, diseño compacto.',
                'category_id' => $categoryIdMap['accesorios'], // ✅
                'price_usd' => 89.99,
                'stock' => 25,
                'in_stock' => 1,
                'image_url' => 'https://placehold.co/600x400/ef4444/white?text=Teclado+Mecanico',
            ],

            // Ropa
            [
                'user_id' => $usuariosProveedores[1]->id,
                'name' => 'Camiseta Deportiva Nike Dri-FIT',
                'description' => 'Camiseta transpirable, ideal para entrenamientos intensos. Tallas S a XXL.',
                'category_id' => $categoryIdMap['ropas'], // ✅
                'price_usd' => 29.99,
                'stock' => 50,
                'in_stock' => 1,
                'image_url' => 'https://placehold.co/600x400/10b981/white?text=Camiseta+Nike',
            ],
            [
                'user_id' => $usuariosProveedores[1]->id,
                'name' => 'Zapatos Casuales Adidas Stan Smith',
                'description' => 'Zapatos icónicos de cuero blanco con suela de goma. Cómodos y duraderos.',
                'category_id' => $categoryIdMap['calzados'], // ✅
                'price_usd' => 89.99,
                'stock' => 12,
                'in_stock' => 1,
                'image_url' => 'https://placehold.co/600x400/f59e0b/white?text=Zapatos+Adidas',
            ],
            [
                'user_id' => $usuariosProveedores[1]->id,
                'name' => 'Jeans Slim Levi’s 511',
                'description' => 'Jeans ajustados de corte moderno, tela elástica para mayor comodidad.',
                'category_id' => $categoryIdMap['ropas'], // ✅
                'price_usd' => 59.99,
                'stock' => 30,
                'in_stock' => 1,
                'image_url' => 'https://placehold.co/600x400/6b7280/white?text=Jeans+Levis',
            ],

            // Hogar
            [
                'user_id' => $usuariosProveedores[2]->id,
                'name' => 'Lámpara de Techo LED Moderna',
                'description' => 'Lámpara de techo con control remoto, 3 modos de color, 5 niveles de brillo.',
                'category_id' => $categoryIdMap['hogar'], // ✅
                'price_usd' => 45.99,
                'stock' => 20,
                'in_stock' => 1,
                'image_url' => 'https://placehold.co/600x400/06b6d4/white?text=Lampara+LED',
            ],
            [
                'user_id' => $usuariosProveedores[2]->id,
                'name' => 'Juego de Sábanas 100% Algodón',
                'description' => 'Sábanas suaves y transpirables, 400 hilos, incluye funda de almohada.',
                'category_id' => $categoryIdMap['hogar'], // ✅
                'price_usd' => 39.99,
                'stock' => 40,
                'in_stock' => 1,
                'image_url' => 'https://placehold.co/600x400/be185d/white?text=Sabanas+Algodon',
            ],
            [
                'user_id' => $usuariosProveedores[2]->id,
                'name' => 'Organizador de Escritorio de Madera',
                'description' => 'Organizador ecológico para oficina, 5 compartimentos, diseño minimalista.',
                'category_id' => $categoryIdMap['hogar'], // ✅
                'price_usd' => 24.99,
                'stock' => 35,
                'in_stock' => 1,
                'image_url' => 'https://placehold.co/600x400/92400e/white?text=Organizador+Madera',
            ],
        ];

        foreach ($productos as $producto) {
            Product::firstOrCreate(
                ['name' => $producto['name'], 'user_id' => $producto['user_id']],
                $producto
            );
        }

        $this->command->info('✅ ' . count($productos) . ' productos creados para 3 proveedores.');
    }
}
