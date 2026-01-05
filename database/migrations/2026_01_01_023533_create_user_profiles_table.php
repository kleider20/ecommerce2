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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            // Relación única con el usuario
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');

            // Ruta de la imagen del avatar
            $table->string('avatar')->nullable();

            // Identificación (Cambiados a nullable para permitir creación inicial)
            $table->string('document_type', 10)->nullable();
            $table->string('document_number', 20)->nullable();

            // Nombres legales (Cambiados a nullable)
            $table->string('first_name', 100)->nullable();
            $table->string('middle_name', 100)->nullable();
            $table->string('first_surname', 100)->nullable();
            $table->string('second_surname', 100)->nullable();

            // Ubicación
            $table->foreignId('country_id')->nullable()->constrained('countries');
            $table->foreignId('state_id')->nullable()->constrained('states');
            $table->string('city')->nullable();
            $table->text('address')->nullable();
            $table->string('postal_code', 20)->nullable();

            // Contacto
            $table->string('phone', 30)->nullable();

            // Datos Personales
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female', 'other', 'not_specified'])->default('not_specified');

            $table->timestamps();
            $table->softDeletes();

            // Índice de rendimiento (permite nulos pero mantiene unicidad si existen datos)
            $table->index(['document_type', 'document_number'], 'document_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};

