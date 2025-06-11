<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Course\CourseController;
use App\Http\Controllers\Courses\CoursesController;
use App\Http\Controllers\Favorite\FavoriteController;
use App\Http\Controllers\Home\HomeController as HomeController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Rating\RatingController;
use App\Http\Controllers\Test\TestController;
use App\Http\Controllers\Test\TestPdf;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

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

    Route::get('/admin', function (Request $request) {
        abort_unless(auth()->check() && auth()->user()->rol === 'admin', 403);
        $controller = app(AdminController::class);
        return $controller->index($request);
    })->name('admin');

    Route::put('/admin/{id}/ban', function ($id) {
        abort_unless(auth()->check() && auth()->user()->rol === 'admin', 403);
        $controller = app(AdminController::class);
        return $controller->ban($id);
    });

    Route::put('/admin/{id}/hide', function ($id) {
        abort_unless(auth()->check() && auth()->user()->rol === 'admin', 403);
        $controller = app(AdminController::class);
        return $controller->hide($id);
    });

    Route::delete('/admin/{id}/user', function ($id) {
        abort_unless(auth()->check() && auth()->user()->rol === 'admin', 403);
        $controller = app(AdminController::class);
        return $controller->deleteUser($id);
    });

    Route::delete('/admin/{id}/course', function ($id) {
        abort_unless(auth()->check() && auth()->user()->rol === 'admin', 403);
        $controller = app(AdminController::class);
        return $controller->deleteCourse($id);
    });

    Route::get('/admin/{id}/editUser', function ($id) {
        abort_unless(auth()->check() && auth()->user()->rol === 'admin', 403);
        $controller = app(AdminController::class);
        return $controller->editUser($id);
    });

    Route::get('/admin/{id}/editCourse', function ($id) {
        abort_unless(auth()->check() && auth()->user()->rol === 'admin', 403);
        $controller = app(AdminController::class);
        return $controller->editCourse($id);
    });

  Route::match(['put', 'post'], '/admin/{id}/updateUser', function (Request $request, $id) {
    abort_unless(auth()->check() && auth()->user()->rol === 'admin', 403);
    $controller = app(AdminController::class);
    return $controller->updateUser($request, $id);
});

  Route::match(['put', 'post'], '/admin/{id}/updateCourse', function (Request $request, $id) {
    abort_unless(auth()->check() && auth()->user()->rol === 'admin', 403);
    $controller = app(AdminController::class);
    return $controller->updateCourse($request, $id);
});

    Route::get('/profile', [ProfileController::class, 'index']);
    Route::get('/profile/edit', [ProfileController::class, 'edit']);
    Route::put('/profile/update', [ProfileController::class, 'update']);
    Route::get('/profile/{id}/profile', [ProfileController::class, 'profileAdmin']);
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::get('/courses', [CoursesController::class, 'index'])->name('courses');
    Route::get('/course/{id}', [CourseController::class, 'index'])->name('course');
    Route::post('/course/{id}/enrollment', [CourseController::class, 'enrollment'])->name('enrollment');
    Route::get('/test/{id}', [CourseController::class, 'courseTest'])->name('test');
    Route::post('/favorite', [FavoriteController::class, 'favorite'])->name('favorite');
    Route::get('/admin/createCourse', [AdminController::class, 'createCourse'])->name('createCourse');
    Route::get('/admin/createUser', [AdminController::class, 'createUser'])->name('createUser');
    Route::post('/admin/storeCourse', [AdminController::class, 'storeCourse'])->name('storeCourse');
    Route::post('/admin/storeUser', [AdminController::class, 'storeUser'])->name('storeUser');
    Route::post('/rating', [RatingController::class, 'rating'])->name('rating');
    Route::get('/test/{student_id}/{test_id}', [TestPdf::class, 'generarPdf'])->name('test');
    Route::get('/ver-pdf', [TestPdf::class, 'verPDF']);


});

  Route::match(['put', 'post'], '/test', function (Request $request) {
    $controller = app(TestController::class);
    return $controller->guardar($request);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
