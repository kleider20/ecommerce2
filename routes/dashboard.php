<?php
// routes/web.php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\EnsureUserHasRole;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Provider\ProductController;
use App\Http\Controllers\SuperAdmin\GeneralSettingController;

use App\Http\Controllers\SuperAdmin\CurrencySettingController;
use App\Http\Controllers\CountryController;

Route::middleware(['auth', 'verified'])->group(function () {

   /*  // Dashboard del super_admin
    Route::middleware('role:super_admin')->prefix('super_admin')->group(function () {
        Route::get('/dashboard', [SuperAdminDashboardController::class, 'index'])->name('admin.dashboard');
        // Otras rutas de admin...
    }); */

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


        Route::get('proveedor/listar-productos', [ProductController::class, 'index']) ->name('products.index');
        Route::get('proveedor/crear-producto', [ProductController::class, 'create']) ->name('products.create');

        Route::get('/settings/general', [GeneralSettingController::class, 'edit'])->name('settings.general.edit');
        Route::put('/settings/general', [GeneralSettingController::class, 'update'])->name('settings.general.update');


        Route::get('/settings/currency', [CurrencySettingController::class, 'edit'])->name('settings.currency.edit');

        Route::put('/settings/currency/base', [CurrencySettingController::class, 'updateBase'])->name('settings.currencybase.update');
        Route::put('/settings/currency/rates', [CurrencySettingController::class, 'updateRates'])->name('settings.currencyrates.update');

        Route::post('/currency/fetch', [CurrencySettingController::class, 'fetchRates'])->name('settings.currency.fetch');

        Route::get('/categorias/crear', [CategoryController::class, 'create'])->name('crear.categorias');




        Route::post('/set-country', [CountryController::class, 'setCountry'])->name('set-country');
    });

    // Productos (protegido por permisos en el controlador)

    // Dashboard del admin
    /* Route::middleware('role:super_admin')->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
        // Otras rutas de admin...
    }); */

    // Dashboard del proveedor
    /* Route::middleware('role:proveedor')->prefix('provider')->group(function () {
        Route::get('/dashboard', [ProviderDashboardController::class, 'index'])->name('provider.dashboard');
        Route::resource('products', ProviderProductController::class);
    }); */

    // Dashboard del vendedor
    /* Route::middleware('role:vendedor')->prefix('seller')->group(function () {
        Route::get('/dashboard', [SellerDashboardController::class, 'index'])->name('seller.dashboard');
        Route::resource('orders', SellerOrderController::class);
    }); */

    // Dashboard del comprador
    /* Route::middleware('role:comprador')->prefix('buyer')->group(function () {
        Route::get('/dashboard', [BuyerDashboardController::class, 'index'])->name('buyer.dashboard');
    }); */

    // Dashboard del anunciante
    /* Route::middleware('role:anunciante')->prefix('advertiser')->group(function () {
        Route::get('/dashboard', [AdvertiserDashboardController::class, 'index'])->name('advertiser.dashboard');
    }); */
});
