<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Models\Stadistic;
use App\Models\Student;
use App\Models\TestEvaluation;
use Illuminate\Http\Request;



class TestController extends Controller
{ // Asegúrate de importar el modelo

public function guardar(Request $request)
{
    $request->validate([
        'usuario_id' => 'required|string|exists:users,id',
        'aciertos' => 'required|integer',
        'fallos' => 'required|integer',
        'no_respondidas' => 'required|integer',
        'nota' => 'required|numeric',
        'idCurso' => 'required|string|exists:courses,id',
        'idTest' => 'required|string|exists:tests,id',
    ]);

    // Obtener el estudiante vinculado al usuario
    $estudiante = Student::where('user_id', $request->usuario_id)->first();

    if (!$estudiante) {
        return back()->withErrors(['usuario_id' => 'No se encontró el estudiante.']);
    }

    // Eliminar evaluaciones anteriores del mismo test (si existen)
    TestEvaluation::where('student_id', $estudiante->id)
                  ->where('test_id', $request->idTest)
                  ->delete();

    // Crear la nueva evaluación
    TestEvaluation::create([
        'student_id' => $estudiante->id,
        'correct_answers' => $request->aciertos,
        'incorrect_answers' => $request->fallos,
        'unanswered_questions' => $request->no_respondidas,
        'nota' => $request->nota,
        'is_passed' => $request->nota >= 5,
        'test_id' => $request->idTest,
    ]);

    // Obtener o crear la estadística
    $estadistica = Stadistic::firstOrNew([
        'student_id' => $estudiante->id,
        'test_id' => $request->idTest,
    ]);

    // Sumar los valores si ya existía
    $estadistica->correct_answers = ($estadistica->correct_answers ?? 0) + $request->aciertos;
    $estadistica->incorrect_answers = ($estadistica->incorrect_answers ?? 0) + $request->fallos;
    $estadistica->unanswered_questions = ($estadistica->unanswered_questions ?? 0) + $request->no_respondidas;
    $estadistica->total_questions = $estadistica->correct_answers + $estadistica->incorrect_answers + $estadistica->unanswered_questions;
    $estadistica->score = $request->nota;
    $estadistica->status = $request->nota >= 5 ? 'aprobado' : 'suspendido';
    $estadistica->completed_at = now();
    $estadistica->save();

    return redirect()->route('course', ['id' => $request->idCurso])
        ->with('message', 'Test guardado correctamente.');
}

}
