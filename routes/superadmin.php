<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SuperAdmin\CurrencySettingController;

Route::middleware(['auth', 'role:super_admin'])
    ->prefix('superadmin/settings')
    ->name('superadmin.settings.')
    ->group(function () {
        // Route::get('/currency', [CurrencySettingController::class, 'edit'])->name('currency.edit');
        // Route::put('/currency', [CurrencySettingController::class, 'update'])->name('currency.update');
        // Route::post('/currency/fetch', [CurrencySettingController::class, 'fetchRates'])->name('currency.fetch');
});
