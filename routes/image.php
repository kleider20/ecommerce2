<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ImageUploadController;


// Rutas protegidas por auth (solo usuarios logueados)
Route::middleware(['auth'])->group(function () {
    Route::post('/upload/image', [ImageUploadController::class, 'upload'])->name('upload.image');
    Route::delete('/upload/image', [ImageUploadController::class, 'destroy'])->name('upload.image.destroy');


    Route::post('/upload/avatar', [ImageUploadController::class, 'uploadAvatar'])->name('upload.avatar');
});
