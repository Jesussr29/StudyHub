<?php 

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Models\TestEvaluation;
use Illuminate\Http\Request;


class TestController extends Controller
{
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

        TestEvaluation::create([
            'student_id' => $request->usuario_id,
            'aciertos' => $request->aciertos,
            'fallos' => $request->fallos,
            'no_respondidas' => $request->no_respondidas,
            'nota' => $request->nota,
            'is_passed' => $request->nota >= 5 ? true : false,
            'test_id' => $request->idTest,
        ]);

        return redirect()->route("/course/$request->idCurso")->with('message', "El usuario correctamente.");

    }
}


?>