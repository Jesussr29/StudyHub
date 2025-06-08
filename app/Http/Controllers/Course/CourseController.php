<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Favorite;
use App\Models\Question;
use App\Models\Test;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use function Laravel\Prompts\alert;

class CourseController extends Controller
{
	public function index($id){

        $curso = Course::findOrFail($id);
        $profesor = User::findOrFail($curso->teacher_id);
        $tests = Test::where("course_id", $curso->id)->get();
        $user = Auth::user();
        $isFavorite = Favorite::where('user_id', $user->id)
        ->where('course_id', $curso->id)
        ->exists();

        
        return Inertia::render("course/Index", [
            'course' => $curso,
            'profesor' => $profesor,
            'tests' => $tests,
            'user' => $user,
            'isFavorite' => $isFavorite,
        ]);

    }

    public function courseTest($id){
        //EL ID ES EL ID DEL TEST

        $test = Test::where("id", $id)->firstOrFail();
        // $questions = Question::where("test_id", $id)->get();
        $questions = Question::all();

        
        return Inertia::render("test/Index", [
            'test' => $test,
            'questions' => $questions,
        ]);

    }
}