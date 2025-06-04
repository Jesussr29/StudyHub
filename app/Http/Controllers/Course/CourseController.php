<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Inertia\Inertia;

class CourseController extends Controller
{
	public function index($id){

        $curso = Course::findOrFail($id);
        $profesor = $curso->professor;

        
        return Inertia::render("course/Index", [
            'course' => $curso,
            'profesor' => $profesor,
        ]);

    }
}