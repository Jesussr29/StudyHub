<?php

use App\Http\Controllers\Home\HomeController as HomeController;
use App\Http\Controllers\Profile\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('auth/login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('auth/register');
    })->name('register');

    Route::get('/home', function () {
        return Inertia::render('home/Index');
    })->name('home');

});

Route::get('/welcome', function () {
    return Inertia::render('welcome/Index');
})->name('welcome');

$user=Auth::user();

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'index']);
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::get('/admin', function () {
        $user = Auth::user();
        abort_unless($user && $user->rol === "admin", 403); 
        return Inertia::render('admin/Index');
    })->name('admin.dashboard');
    

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
