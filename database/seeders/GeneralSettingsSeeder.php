<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\GeneralSetting;
use App\Models\Country;

class GeneralSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Asegúrate de que el país exista
        if (!Country::where('iso2', 'VE')->exists()) {
            Country::create([
                'name' => 'Venezuela',
                'iso2' => 'VE',
                'iso3' => 'VEN',
                'phone_code' => '+58',
                'capital' => 'Caracas',
                'region' => 'América del Sur',
                'flag_url' => '/flags/ve.svg',
                'language_name' => 'Español',
                'language_code' => 'es',
                'locale' => 'es-VE',
                'currency_name' => 'Bolívar Soberano',
                'currency_code' => 'VES',
                'currency_symbol' => 'Bs',
                'exchange_rate_to_usd' => 0.000012,
                'exchange_rate_from_api' => 0.000012,
                'tax_rate' => 16.00,
                'tax_included_in_price' => false,
                'timezone' => 'America/Caracas',
                'is_active' => true,
            ]);
        }

        GeneralSetting::create([
            'site_name' => 'TechStore',
            'operating_country_iso2' => 'VE',
            'maintenance_mode' => false,
        ]);
    }
}
