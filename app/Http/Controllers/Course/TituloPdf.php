<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Student;
use App\Models\Test;
use App\Models\TestEvaluation;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TituloPdf extends Controller
{
    public function generarPdfTitulo($course_id)
    {
        // Ejemplo: obtener datos de la base de datos
        $usuario = Auth::user();

        $student = Student::where('user_id', $usuario->id)
            ->where('course_id', $course_id)
            ->first();

        $course = Course::findOrFail($course_id);


        // Pasa los datos a la vista
        $pdf = Pdf::loadView('pdf.ejemplo', [
            'usuario' => $usuario,
            'curso' => $course,
        ]);

        $nombreCurso = $course->name;

        $nombreArchivo = "$nombreCurso-$usuario->id.pdf";
        $ruta = 'pdfs/' . $nombreArchivo;
        Storage::disk('public')->put($ruta, $pdf->output());

        $url = Storage::url($ruta); // Esto genera la URL pública

        return view('ver_pdf', ['url' => $url]);
        // return redirect(Storage::url($ruta));

    }
}
