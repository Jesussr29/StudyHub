<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Course\CourseController;
use App\Http\Controllers\Courses\CoursesController;
use App\Http\Controllers\Home\HomeController as HomeController;
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

    Route::get('/welcome', function () {
        return Inertia::render('welcome/Index');
    })->name('welcome');

    Route::get('/', function () {
        return Inertia::render('welcome/Index');
    })->name('welcome');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/courses', function () {
        return Inertia::render('courses/Index');
    })->name('courses');

    Route::get('/course', function () {
        return Inertia::render('course/Index');
    })->name('course');

    Route::get('/admin', function () {
        abort_unless(auth()->user() && auth()->user()->rol === 'admin', 403); 
        return Inertia::render('admin/Index');
    })->name('admin.dashboard');

    Route::get('/profile', [ProfileController::class, 'index']);
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::get('/courses', [CoursesController::class, 'index'])->name('courses');
    Route::get('/course/{id}', [CourseController::class, 'index'])->name('course');
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');
    Route::put('/admin/{id}/ban', [AdminController::class, 'ban']);
    Route::put('/admin/{id}/hide', [AdminController::class, 'hide']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';