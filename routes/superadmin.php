<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SuperAdmin\CurrencySettingController;

use App\Http\Controllers\SuperAdmin\GeneralSettingController;

Route::middleware(['auth', 'verified'])->prefix('dashboard/superadmin')->group(function () {

    Route::get('/system/config', [GeneralSettingController::class, 'edit'])->name('system.config');
    Route::put('/settings/general', [GeneralSettingController::class, 'update'])->name('settings.general.update');

        // Route::get('/currency', [CurrencySettingController::class, 'edit'])->name('currency.edit');
        // Route::put('/currency', [CurrencySettingController::class, 'update'])->name('currency.update');
        // Route::post('/currency/fetch', [CurrencySettingController::class, 'fetchRates'])->name('currency.fetch');
});
