<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

use App\Http\Controllers\CountryController;

Route::get('/', [HomeController::class, 'index'])->name('/');
// Route::post('/set-country', [HomeController::class, 'setCountry'])->name('set-country');

Route::post('/set-country', [CountryController::class, 'setCountry'])->name('set-country');

require __DIR__.'/auth.php';
