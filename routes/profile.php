<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\User\UserPersonalInfoController;
use App\Http\Controllers\CountryController;

use App\Http\Controllers\User\UserBasicProfileController;


// API para el perfil de usuario
Route::middleware(['auth'])->group(function () {
    Route::get('/api/user/profile', [UserPersonalInfoController::class, 'index']);
    Route::put('/api/user/profile', [UserPersonalInfoController::class, 'update']);

    // Países (pública o con auth)
    Route::get('/api/countries', [CountryController::class, 'index']);
    Route::get('/api/countries/{country}/states', [CountryController::class, 'states']);

    Route::get('/api/user/basic-profile', [UserBasicProfileController::class, 'index']);
    Route::put('/api/user/basic-profile', [UserBasicProfileController::class, 'update']);
});
