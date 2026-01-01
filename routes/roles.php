<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\RoleController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\PermissionController;

// Route::middleware(['auth'])->prefix('dashboard')->group(function () {
//     Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
// });



Route::middleware(['auth'])->prefix('dashboard')->group(function () {

    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');

    Route::get('/roles/crear', [RoleController::class, 'create'])->name('roles.create');
    Route::post('/roles/store', [RoleController::class, 'store'])->name('roles.store');

    // Gestión de permisos
    Route::post('/roles/{role}/permissions/{permission}/attach', [RolePermissionController::class, 'attach'])
        ->name('roles.permissions.attach');
    Route::post('/roles/{role}/permissions/{permission}/detach', [RolePermissionController::class, 'detach'])
        ->name('roles.permissions.detach');
    Route::delete('/permissions/{permission}', [RolePermissionController::class, 'destroy'])
        ->name('permissions.destroy');
    Route::patch('/roles/{role}/toggle-register', [RoleController::class, 'toggleRegister'])
        ->name('roles.toggle-register');

    Route::get('/roles/{role}/editar', [RoleController::class, 'edit'])->name('roles.edit');
    Route::put('/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

    Route::get('/roles/permissions/create', [PermissionController::class, 'create'])->name('roles.permissions.create');
    Route::post('/permissions', [PermissionController::class, 'store'])->name('permissions.store');

});

