<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Country;
use App\Models\UserProfile;

class UserPersonalInfoController extends Controller
{
    public function index()
    {
        $countries = Country::where('is_active', true)->get();
        $profile = auth()->user()->userProfile;

        return response()->json([
            'profile' => $profile,
            'countries' => $countries,
            'states' => $profile?->country?->states ?? collect()
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:100',
            'first_surname' => 'required|string|max:100',
            'document_type' => 'required|string|max:10',
            'document_number' => 'required|string|max:20',
            'country_id' => 'required|exists:countries,id',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:male,female,other,not_specified',
        ]);

        $user = auth()->user();

        $user->userProfile()->updateOrCreate(
            ['user_id' => $user->id],
            $request->only([
                'document_type',
                'document_number',
                'first_name',
                'middle_name',
                'first_surname',
                'second_surname',
                'country_id',
                'state_id',
                'city',
                'address',
                'postal_code',
                'phone',
                'date_of_birth',
                'gender'
            ])
        );

        return response()->json(['message' => 'Perfil actualizado correctamente']);
    }
}
