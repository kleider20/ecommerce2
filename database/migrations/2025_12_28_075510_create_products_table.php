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

            // 👇 Campos para el ProductCard
            $table->string('brand')->nullable();                // Marca del producto
            $table->boolean('is_bestseller')->default(false);   // ¿Es bestseller?
            $table->boolean('is_new')->default(false);          // ¿Es nuevo?
            $table->decimal('rating', 3, 2)->nullable()->default(0.00); // Promedio de reseñas
            $table->unsignedInteger('review_count')->default(0); // Cantidad de reseñas
            $table->boolean('free_shipping')->default(false);   // ¿Tiene envío gratis?
            $table->string('warranty')->nullable();             // Ej: "2 años de garantía"
            $table->string('price_per_unit')->nullable();       // Ej: "/unidad", "/kg"
            $table->string('sku')->nullable()->unique();        // Código único del producto
            $table->text('short_description')->nullable();      // Descripción corta para tarjetas
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
