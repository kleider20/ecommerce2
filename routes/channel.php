<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\User;

use Illuminate\Support\Facades\Route;
use Illuminate\Broadcasting\BroadcastController;

Broadcast::channel('notifications.{id}', function (User $user, $id) {
    return (int) $user->id === (int) $id;
});


// Ruta de autenticación para broadcasting (requerida por Pusher)
Route::post('/broadcasting/auth', [BroadcastController::class, 'authenticate'])
    ->middleware(['web', 'auth']);
