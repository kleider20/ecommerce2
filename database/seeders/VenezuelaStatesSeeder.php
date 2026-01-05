<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Country;

class VenezuelaStatesSeeder extends Seeder
{
    public function run(): void
    {
        // Buscamos a Venezuela por su código ISO2
        $country = DB::table('countries')->where('iso2', 'VE')->first();

        if (!$country) {
            $this->command->error("No se encontró Venezuela en la tabla countries. Asegúrate de ejecutar primero el seeder de países.");
            return;
        }

        $states = [
            ['name' => 'Amazonas', 'code' => 'AM'],
            ['name' => 'Anzoátegui', 'code' => 'AN'],
            ['name' => 'Apure', 'code' => 'AP'],
            ['name' => 'Aragua', 'code' => 'AR'],
            ['name' => 'Barinas', 'code' => 'BA'],
            ['name' => 'Bolívar', 'code' => 'BO'],
            ['name' => 'Carabobo', 'code' => 'CA'],
            ['name' => 'Cojedes', 'code' => 'CO'],
            ['name' => 'Delta Amacuro', 'code' => 'DA'],
            ['name' => 'Dependencias Federales', 'code' => 'DF'],
            ['name' => 'Distrito Capital', 'code' => 'DC'],
            ['name' => 'Falcón', 'code' => 'FA'],
            ['name' => 'Guárico', 'code' => 'GU'],
            ['name' => 'Lara', 'code' => 'LA'],
            ['name' => 'Mérida', 'code' => 'ME'],
            ['name' => 'Miranda', 'code' => 'MI'],
            ['name' => 'Monagas', 'code' => 'MO'],
            ['name' => 'Nueva Esparta', 'code' => 'NE'],
            ['name' => 'Portuguesa', 'code' => 'PO'],
            ['name' => 'Sucre', 'code' => 'SU'],
            ['name' => 'Táchira', 'code' => 'TA'],
            ['name' => 'Trujillo', 'code' => 'TR'],
            ['name' => 'Vargas (La Guaira)', 'code' => 'VA'],
            ['name' => 'Yaracuy', 'code' => 'YA'],
            ['name' => 'Zulia', 'code' => 'ZU'],
        ];

        foreach ($states as $state) {
            DB::table('states')->updateOrInsert(
                ['country_id' => $country->id, 'code' => $state['code']],
                [
                    'name' => $state['name'],
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );
        }

        $this->command->info("Estados de Venezuela cargados correctamente.");
    }
}
