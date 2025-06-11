<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Stadistic;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $userId = $user->id;
        $role = $user->rol;

        if ($role === 'student') {
            $enrollments = Student::with('course.tests')
                ->where('user_id', $userId)
                ->get();

            $studentIds = $enrollments->pluck('id')->toArray();

            $stadistics = Stadistic::whereIn('student_id', $studentIds)->get();

            return inertia('profile/Index', [
                'user' => $user,
                'enrollments' => $enrollments,
                'stadistics' => $stadistics,
                'role' => $role
            ]);
            
        } elseif ($role === 'teacher') {
            $courses = Course::where('teacher_id', $userId)
                ->with(['tests', 'students.stadistics.student.user'])
                ->get();

            $courseStats = $courses->map(function ($course) {
                $stats = $course->students->flatMap->stadistics;
                $stats = $stats->map(function ($stat) {
                    $name = $stat->student->user->name ?? $stat->student->name ?? null;
                    return array_merge($stat->toArray(), [
                        'student_name' => $name
                    ]);
                });
                return [
                    'course' => $course,
                    'stats' => $stats
                ];
            });

            return inertia('profile/Index', [
                'user' => $user,
                'courses' => $courses,
                'courseStats' => $courseStats,
                'role' => $role
            ]);
        } 

        return abort(403, 'Rol no reconocido');
    }
    public function profileAdmin($id)
    {
        $user = User::where('id', $id)->first();

        $userId = $user ? $user->id : null;

        $enrollments = Student::with('course.tests')
            ->where('user_id', $userId)
            ->get();

        $studentIds = $enrollments->pluck('id')->toArray();

        $stadistics = Stadistic::whereIn('student_id', $studentIds)->get();

        return inertia('profile/Index', [
            'user' => $user,
            'enrollments' => $enrollments,
            'stadistics' => $stadistics,
        ]);
    }

    public function edit()
    {
        $user = Auth::user();

        return Inertia::render('profile/EditUser', [
            'user' => $user,
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->description = $request->description;

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

        return redirect('/profile')->with('message', "Tu perfil ha sido actualizado correctamente.");
    }
}
