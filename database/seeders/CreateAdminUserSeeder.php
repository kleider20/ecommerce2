<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ───────────────────────────────
        // 1. Crear usuario super_admin (solo si no existe)
        // ───────────────────────────────

        $adminEmail = 'superadmin@test.com';
        if (!User::where('email', $adminEmail)->exists()) {
            $user = User::create([
                'name' => 'Super Admin',
                'email' => $adminEmail,
                'email_verified_at' => now(),
                'password' => Hash::make('123456'),
            ]);
            $user->assignRole('super_admin');
        }
    }
}
