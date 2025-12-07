<?php

namespace Database\Seeders;

use App\Models\CurrencySetting;
use Illuminate\Database\Seeder;

class CurrencySettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Verifica si ya existe un registro
        if (!CurrencySetting::exists()) {
            CurrencySetting::create([
                'base_currency_code' => 'USD',
                'base_currency_symbol' => '$',
                'manual_exchange_rates' => [
                    'VES' => 350,
                    'COP' => 4000,
                    'MXN' => 17,
                    'EUR' => 0.93,
                ],
            ]);
        }
    }
}
