<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PageLayout;

class DefaultPageLayoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Configuración para la página de inicio (DefaultPage)
        PageLayout::updateOrCreate(
            ['page_name' => 'DefaultPage'],
            [
                'layout_path' => '2026/Home/HomeLayout',
                'role' => null,
                'permission' => null,
                'is_active' => true
            ]
        );

        // // Opcional: Configuración para página Home específica
        // PageLayout::updateOrCreate(
        //     ['page_name' => 'Home'],
        //     [
        //         'layout_path' => '2026/Home/HomeLayout',
        //         'role' => 'guest',
        //         'permission' => null,
        //         'is_active' => true
        //     ]
        // );
    }

}
