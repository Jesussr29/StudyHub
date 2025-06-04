<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\BienvenidaUsuario;
use App\Models\Course;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {

        $user = Auth::user();
        $cursos = Course::all()->toArray();
        $students = User::where('rol', 'student')->get()->toArray();
        $teachers = User::where('rol', 'teacher')->get()->toArray();

        return Inertia::render("admin/Index", [
            'user' => $user,
            'courses' => $cursos,
            'teachers' => $teachers,
            'students' => $students,
        ]);
    }

    public function ban($id)
    {
        $user = User::findOrFail($id);

        $user->isBanned = !$user->isBanned;
        $user->save();

        $userName = $user->name;
        $status = $user->isBanned ? 'baneado' : 'desbaneado';
        Mail::raw("Hola {$user->name}, bienvenido a la plataforma.", function ($message) use ($user) {
    $message->to($user->email)->subject('Bienvenida');
});

        return redirect()->back()->with('message', "El usuario {$userName} ha sido {$status} correctamente.");
    }


    public function hide($id)
    {
        $course = Course::findOrFail($id);

        $course->isHidden = !$course->isHidden;
        $course->save();

        $status = $course->isHidden ? 'ocultado' : 'visible nuevamente';

        return redirect()->back()->with('message', "El curso '{$course->title}' ahora está {$status}.");
    }
}
