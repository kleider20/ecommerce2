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
        Schema::create('page_layouts', function (Blueprint $table) {
            $table->id();
            $table->string('page_name');         // UserProfilePage
            $table->string('layout_path');       // Custom/UserProfileLayout
            $table->string('permission')->nullable(); // view-profile
            $table->string('role')->nullable();       // super_admin
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_layouts');
    }
};
