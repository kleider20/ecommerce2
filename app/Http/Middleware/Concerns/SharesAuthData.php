<?php
// app/Http/Middleware/Concerns/SharesAuthData.php
namespace App\Http\Middleware\Concerns;

use Illuminate\Support\Facades\Auth;

trait SharesAuthData
{
    protected function getAuthData()
    {
        $authUser = Auth::user();

        if (!$authUser) {
            return [
                'authUser' => null,
                'userRole' => 'guest',
                'profileData' => null
            ];
        }

        // Determinar rol principal
        $roles = $authUser->getRoleNames()->toArray();
        $rolePriority = ['super_admin', 'user', 'proveedor', 'vendedor', 'anunciante'];
        $userRole = 'guest';

        foreach ($rolePriority as $role) {
            if (in_array($role, $roles)) {
                $userRole = $role;
                break;
            }
        }

        // Datos del perfil
        $profileData = $authUser->profile ? [
            'avatar' => $authUser->profile->avatar,
            'avatar_url' => $authUser->profile->avatar_url,
            'first_name' => $authUser->profile->first_name,
            'middle_name' => $authUser->profile->middle_name,
            'first_surname' => $authUser->profile->first_surname,
            'second_surname' => $authUser->profile->second_surname,
            'full_name' => trim("{$authUser->profile->first_name} {$authUser->profile->first_surname}"),
            'document' => "{$authUser->profile->document_type}-{$authUser->profile->document_number}",
            'phone' => $authUser->profile->phone,
            'address' => $authUser->profile->address,
            'postal_code' => $authUser->profile->postal_code,
            'city' => $authUser->profile->city,
            'state_name' => $authUser->profile->state?->name,
            'country_name' => $authUser->profile->country?->name,
            'date_of_birth' => $authUser->profile->date_of_birth?->format('Y-m-d'),
            'gender' => $authUser->profile->gender,
        ] : null;

        return [
            'authUser' => $authUser,
            'userRole' => $userRole,
            'profileData' => $profileData
        ];
    }
}
