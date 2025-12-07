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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Proveedor (usuario)
            $table->string('name');
            $table->text('description');
            $table->foreignId('category_id')->constrained()->onDelete('cascade'); // ¡Relación clave!
            $table->decimal('price_usd', 12, 2);          // Precio base en USD (para conversión multi-moneda)
            $table->decimal('original_price_usd', 12, 2)->nullable(); // Para tachado
            $table->integer('stock')->default(0);
            $table->boolean('in_stock')->default(false);
            $table->string('image_url')->nullable();      // Ruta a la imagen (ej: /storage/products/1.jpg)
            $table->boolean('is_active')->default(true);  // ¿Visible en tienda?
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
