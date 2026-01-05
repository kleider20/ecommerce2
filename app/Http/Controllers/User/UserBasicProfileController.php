<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserBasicProfileController extends Controller
{
    public function index()
    {
        return response()->json([
            'name' => auth()->user()->name,
            'email' => auth()->user()->email,
            'profile' => auth()->user()->profile
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . auth()->id()
        ]);

        auth()->user()->update($request->only(['name', 'email']));

        return response()->json(['message' => 'Perfil actualizado correctamente']);
    }
}
