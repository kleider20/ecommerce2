<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

// use App\Http\Controllers\CountryController;

// Route::post('/set-country', [CountryController::class, 'setCountry'])->name('set-country');


// Route::get('proveedor/listar-productos', [ProductController::class, 'index']) ->name('products.index');
// Route::get('proveedor/crear-producto', [ProductController::class, 'create']) ->name('products.create');


Route::middleware(['auth', 'verified'])->group(function () {

});
