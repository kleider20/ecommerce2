<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth'])->group(function () {
    Route::get('/profile', function () {
        return Inertia::render('Users/Profile/ProfilePage');
    })->name('profile'); // ✅ Esto SÍ funciona
});
