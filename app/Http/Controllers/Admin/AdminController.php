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
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminController extends Controller
{
  public function index(Request $request)
{
    $studentSearch = $request->input('studentSearch');
    $teacherSearch = $request->input('teacherSearch');
    $courseSearch = $request->input('courseSearch');

    $students = User::where('rol', 'student')
        ->when($studentSearch, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                      ->orWhere('email', 'like', '%' . $search . '%');
            });
        })
        ->get();

    $teachers = User::where('rol', 'teacher')
        ->when($teacherSearch, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                      ->orWhere('email', 'like', '%' . $search . '%');
            });
        })
        ->get();

    $courses = Course::query()
        ->when($courseSearch, callback: function ($query, $search) {
            $query->where('name', 'like', '%' . $search . '%')
                  ->orWhere('description', 'like', '%' . $search . '%');
        })
        ->get();

    return Inertia::render('admin/Index', [
        'user' => Auth::user(),
        'students' => $students,
        'teachers' => $teachers,
        'courses' => $courses,
        'filters' => [
            'studentSearch' => $studentSearch,
            'teacherSearch' => $teacherSearch,
            'courseSearch' => $courseSearch,
            'tab' => $request->input('tab', 'students'),
        ],
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

        if ($user->image && file_exists(public_path($user->image))) {
            unlink(public_path($user->image));
        }

        $user->delete();

        return redirect()->back()->with('message', "El usuario {$userName} ha sido eliminado correctamente.");
    }

    public function deleteCourse($id)
    {
        $course = Course::findOrFail($id);
        $courseTitle = $course->title;

        if ($course->image && file_exists(public_path($course->image))) {
            unlink(public_path($course->image));
        }

        if ($course->pdf && file_exists(public_path($course->pdf))) {
            unlink(public_path($course->pdf));
        }

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
        $teachers = User::where('rol', 'teacher')->get(['id', 'name']);

        return Inertia::render('admin/EditCourse', [
            'course' => $course,
            'teachers' => $teachers,
        ]);
    }

    public function updateCourse(Request $request, $id)
    {

        $course = Course::findOrFail($id);
        
        
        $request->validate([
            'name' => 'required|string|max:255|unique:courses,name,' . $course->id,
            'description' => 'required|string',
            'duration' => 'required|integer|min:1',
            'teacher_id' => 'required|exists:users,id',
            'isHidden' => 'required|boolean',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'pdf' => 'nullable|mimes:pdf|max:5120',
        ]);
        
        $course->name = $request->name;
        $course->description = $request->description;
        $course->duration = $request->duration;
        $course->teacher_id = $request->teacher_id;
        $course->isHidden = $request->isHidden;
        
        if ($request->hasFile('image')) {
            if ($course->image && file_exists(public_path($course->image))) {
                unlink(public_path($course->image));
            }
            
            $image = $request->file('image');
            $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            $pathFolder = 'img/Courses';
            $image->move(public_path($pathFolder), $filename);
            $course->image = $pathFolder . '/' . $filename;
        }
        
        if ($request->hasFile('pdf')) {
            if ($course->pdf && file_exists(public_path($course->pdf))) {
                unlink(public_path($course->pdf));
            }
            
            $pdf = $request->file('pdf');
            $filename = time() . '_' . Str::random(10) . '.' . $pdf->getClientOriginalExtension();
            $pathFolder = 'pdf/Courses';
            $pdf->move(public_path($pathFolder), $filename);
            $course->pdf = $pathFolder . '/' . $filename;
        }
        
        $course->save();

        return redirect('/admin')->with('message', "El curso '{$course->name}' ha sido actualizado correctamente.");
    }
}
