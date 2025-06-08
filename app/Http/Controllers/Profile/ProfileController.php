<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Stadistic;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $enrollments = Student::with('course.tests')
            ->where('user_id', $userId)
            ->get();

        $studentIds = $enrollments->pluck('id')->toArray();

        $stadistics = Stadistic::whereIn('student_id', $studentIds)->get();

        return inertia('profile/Index', [
            'user' => Auth::user(),
            'enrollments' => $enrollments,
            'stadistics' => $stadistics,
        ]);
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
}
