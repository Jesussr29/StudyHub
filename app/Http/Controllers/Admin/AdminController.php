<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\BienvenidaUsuario;
use App\Models\Course;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
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

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $userName = $user->name;
        $user->delete();

        return redirect()->back()->with('message', "El usuario {$userName} ha sido eliminado correctamente.");
    }

    public function deleteCourse($id)
    {
        $course = Course::findOrFail($id);
        $courseTitle = $course->title;
        $course->delete();

        return redirect()->back()->with('message', "El curso '{$courseTitle}' ha sido eliminado correctamente.");
    }

    public function editUser($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('admin/EditUser', [
            'user' => $user,
        ]);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'rol' => 'required|in:teacher,student', 
            'description' => 'nullable|string',
            'isBanned' => 'required|boolean',
            'image' => 'nullable|image|max:2048', 
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->rol = $request->rol;
        $user->description = $request->description;
        $user->isBanned = $request->isBanned;

        if ($request->hasFile('image')) {
    if ($user->image && file_exists(public_path($user->image))) {
        unlink(public_path($user->image));
    }

    $file = $request->file('image');
    $filename = time() . '_' . $file->getClientOriginalName();

    if ($user->rol === 'teacher') {
        $pathFolder = 'img/Teachers';
    } else {
        $pathFolder = 'img/Students';
    }

    $file->move(public_path($pathFolder), $filename);

    $user->image = $pathFolder . '/' . $filename;
}

        $user->save();

        return redirect('/admin')->with('message', "El usuario {$user->name} ha sido actualizado correctamente.");
    }

    public function editCourse($id)
    {
        $course = Course::findOrFail($id);

        return Inertia::render('admin/EditCourse', [
            'course' => $course,
        ]);
    }

    public function updateCourse($id)
    {
        $course = Course::findOrFail($id);
        $data = request()->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'isHidden' => 'boolean',
        ]);

        $course->update($data);

        return redirect()->route('admin')->with('message', "El curso '{$course->title}' ha sido actualizado correctamente.");
    }
}
