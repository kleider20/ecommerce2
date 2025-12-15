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
        Schema::create('permission_metadata', function (Blueprint $table) {
            $table->id();
            $table->foreignId('permission_id')->constrained()->onDelete('cascade');
            $table->string('display_name');
            $table->text('description')->nullable();
            $table->boolean('is_critical')->default(false); // 👈 Permisos que no se pueden eliminar
            $table->string('category')->default('general'); // ej: 'users', 'products', 'settings'
            $table->timestamps();

            $table->unique('permission_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permission_metadata');
    }
};
