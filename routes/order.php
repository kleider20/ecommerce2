<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

Route::middleware(['auth', 'verified'])->group(function () {
    // Rutas de pedidos
    Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
});
