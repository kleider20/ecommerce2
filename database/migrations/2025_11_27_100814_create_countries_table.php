<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);                      // Venezuela
            $table->char('iso2', 2)->unique();                // VE
            $table->char('iso3', 3)->unique();                // VEN
            $table->string('phone_code', 10)->nullable();     // +58
            $table->string('capital', 100)->nullable();       // Caracas
            $table->string('region', 50)->nullable();         // América del Sur
            $table->string('flag_url', 255)->nullable();      // /flags/ve.svg
            $table->string('language_name', 50);              // Español
            $table->char('language_code', 2);                 // es
            $table->string('locale', 10);                     // es-VE
            $table->string('currency_name', 50);              // Bolívar Soberano
            $table->char('currency_code', 3);                 // VES
            $table->string('currency_symbol', 10);            // Bs
            $table->string('currency_format', 20)->nullable(); // #,##0.00
            $table->decimal('exchange_rate_to_usd', 12, 6)->default(1.000000); // 0.000012
            $table->decimal('exchange_rate_from_api', 12, 6)->nullable()->default(0.000000);
            $table->decimal('tax_rate', 5, 2)->default(0.00); // 16.00
            $table->boolean('tax_included_in_price')->default(false);
            $table->string('timezone', 50)->default('UTC');   // America/Caracas
            $table->boolean('is_active')->default(true);      // ¿Disponible en la tienda?

            // Separador de miles (por defecto: coma)
            $table->string('currency_thousand_separator', 1)->default(',');

            // Separador decimal (por defecto: punto)
            $table->string('currency_decimal_separator', 1)->default('.');

            // Número de dígitos decimales (por defecto: 2)
            $table->unsignedTinyInteger('currency_decimal_digits')->default(2);

            $table->enum('currency_symbol_position', ['before', 'after'])->default('before');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('countries', function (Blueprint $table) {
            $table->dropColumn([
                'currency_thousand_separator',
                'currency_decimal_separator',
                'currency_decimal_digits'
            ]);
        });
    }
};
