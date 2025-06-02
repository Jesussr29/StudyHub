<?php

use App\Http\Controllers\Home\HomeController;
use App\Http\Controllers\Profile\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('auth/login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('auth/register');
    })->name('register');

    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');

    Route::get('/welcome', function () {
        return Inertia::render('welcome/Index');
    })->name('welcome');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'index']);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
