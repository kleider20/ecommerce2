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
        Schema::create('role_metadata', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained()->onDelete('cascade');
            $table->string('display_name');
            $table->text('description')->nullable();
            $table->string('color')->default('bg-gray-100 text-gray-800');
            $table->string('icon')->default('Shield');
            $table->json('registration_fields')->nullable(); // 👈 Campos específicos de registro
            $table->boolean('show_in_register')->default(false);
            $table->timestamps();

            $table->unique('role_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_metadata');
    }
};
