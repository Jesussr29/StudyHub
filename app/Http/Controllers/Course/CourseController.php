<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Test;
use App\Models\User;
use Inertia\Inertia;

use function Laravel\Prompts\alert;

class CourseController extends Controller
{
	public function index($id){

        $curso = Course::findOrFail($id);
        $profesor = User::findOrFail($curso->teacher_id);
        $tests = Test::where("course_id", $curso->id)->get();

        
        return Inertia::render("course/Index", [
            'course' => $curso,
            'profesor' => $profesor,
            'tests' => $tests,
        ]);

    }

    public function courseTest($id){
        //AÑADIR ID DE TEST

        $curso = Course::where("id", $id)->firstOrFail();
        $profesor = User::findOrFail($curso->teacher_id);
        $test = Test::where("course_id", $curso->id)->firstOrFail();
        


        alert("hola");
        
        return Inertia::render("test/Index", [
            'course' => $curso,
            'profesor' => $profesor,
            'test' => $test,
        ]);

    }
}