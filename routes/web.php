<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/* Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); */

// Route::get('/', function () {
//     return Inertia::render('Home');
// });


/* Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard'); */

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
require __DIR__.'/channel.php';

require __DIR__.'/home.php';
require __DIR__.'/dashboard.php';

require __DIR__.'/superadmin.php';

require __DIR__.'/product.php';
require __DIR__.'/image.php';
require __DIR__.'/roles.php';
require __DIR__.'/legal.php';


require __DIR__.'/notifications.php';
require __DIR__.'/settings.php';
require __DIR__.'/profile.php';


require __DIR__.'/user.php';


require __DIR__.'/admin.php';
