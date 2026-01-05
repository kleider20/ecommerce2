

<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\User\UserSettingsController;

Route::middleware(['auth'])->group(function () {
    Route::get('/user/settings', [UserSettingsController::class, 'index'])->name('user.settings');
    // Route::post('/settings/update', [UserSettingsController::class, 'update'])->name('settings.update');
    // Route::post('/settings/update-personal', [UserSettingsController::class, 'updatePersonalInfo'])->name('settings.update-personal');
});
