<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use Inertia\Inertia;

class CourseController extends Controller
{
	public function index($id){

        $curso = Course::findOrFail($id);
        $profesor = User::findOrFail($curso->teacher_id);
        
        return Inertia::render("course/Index", [
            'course' => $curso,
            'profesor' => $profesor,
        ]);

    }

    public function courseTest($id){

        $curso = Course::findOrFail($id);
        $profesor = User::findOrFail($curso->teacher_id);
        
        return Inertia::render("test/Index", [
            'course' => $curso,
            'profesor' => $profesor,
        ]);

    }
}