<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Categorías raíz
        $electronics = Category::create([
            'name' => 'Electrónica',
            'slug' => 'electronica',
            'status' => 'active'
        ]);

        // Categorías raíz
        $hogar = Category::create([
            'name' => 'Hogar',
            'slug' => 'hogar',
            'status' => 'active'
        ]);

        $ropa = Category::create([
            'name' => 'Ropa',
            'slug' => 'ropa',
            'status' => 'active'
        ]);

        // Subcategorías
        Category::create([
            'name' => 'Teléfonos',
            'slug' => 'telefonos',
            'parent_id' => $electronics->id,
            'status' => 'active'
        ]);

        Category::create([
            'name' => 'Computadoras',
            'slug' => 'computadoras',
            'parent_id' => $electronics->id,
            'status' => 'active'
        ]);

        Category::create([
            'name' => 'Ropa deportiva',
            'slug' => 'ropa-deportiva',
            'parent_id' => $ropa->id,
            'status' => 'active'
        ]);

        Category::create([
            'name' => 'Monitores',
            'slug' => 'monitores',
            'parent_id' => $electronics->id,
            'status' => 'active'
        ]);

        Category::create([
            'name' => 'Accesorios',
            'slug' => 'accesorios',
            'parent_id' => $electronics->id,
            'status' => 'active'
        ]);

        Category::create([
            'name' => 'Calzados',
            'slug' => 'calzados',
            'parent_id' => $ropa->id,
            'status' => 'active'
        ]);
    }
}
