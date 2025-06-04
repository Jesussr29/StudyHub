<?php

namespace App\Http\Controllers\Courses;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;

class CoursesController extends Controller
{
	public function index(){

        $cursos = Course::all();

        
        return inertia('courses/Index', [
            'user' => Auth::user(),
            'courses' => $cursos,
        ]);

    }
}