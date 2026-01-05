<?php

use Illuminate\Support\Facades\Route;

// Páginas legales
Route::get('/terms', function () {
    return inertia('Legal/Terms');
})->name('terms');

Route::get('/privacy', function () {
    return inertia('Legal/Privacy');
})->name('privacy');
