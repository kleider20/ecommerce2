<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\PageLayoutController;

// Route::middleware(['auth'])->prefix('admin')->group(function () {
//     Route::get('/settings/layouts', [PageLayoutController::class, 'index'])
//     ->name('admin.layout-configurations.index');
// });


Route::middleware(['auth'])->prefix('admin')->group(function () {
    // Listar todas las configuraciones
    Route::get('/page-layouts', [PageLayoutController::class, 'index'])
         ->name('admin.page-layouts.index');

    // Guardar nueva configuración
    Route::post('/page-layouts', [PageLayoutController::class, 'store'])
         ->name('admin.page-layouts.store');

    // Actualizar configuración existente
    Route::put('/page-layouts/{pageLayout}', [PageLayoutController::class, 'update'])
         ->name('admin.page-layouts.update');

    // Eliminar configuración
    Route::delete('/page-layouts/{pageLayout}', [PageLayoutController::class, 'destroy'])
         ->name('admin.page-layouts.destroy');
});
