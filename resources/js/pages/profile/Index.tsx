import { useState } from 'react';
import MenuDesplegable from '@/layouts/app/inicio-header-layout';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  user: any;
  stadistics: any[]; // Estadísticas del usuario (de tests)
  enrollments: any[];    // Inscripciones del usuario a cursos (con course y tests)
}

export default function ProfileIndex({ user, stadistics, enrollments }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<any>(null);


  const cursosEnProceso = enrollments.filter(e => e.completion_date === null);
  const cursosCompletados = enrollments.filter(e => e.completion_date !== null);

  const abrirDialogo = (curso: any) => {
    setCursoSeleccionado(curso);
    setDialogOpen(true);
  };

  const estadisticasCurso = (() => {
    if (!cursoSeleccionado) return [];

    const inscripcion = enrollments.find(s => s.course.id === cursoSeleccionado.id);
    if (!inscripcion) return [];

    const testIds = cursoSeleccionado.tests?.map((test: any) => test.id) ?? [];

    return stadistics.filter(
      stat => stat.student_id === inscripcion.id && testIds.includes(stat.test_id)
    );
  })();

  return (
    <>
      <MenuDesplegable />

      <section className="p-8">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <h2 className="text-gray-600">{user.email}</h2>
      </section>

      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Cursos en proceso</h2>
        {cursosEnProceso.length === 0 ? (
          <p className="text-gray-500">No tienes cursos en proceso.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cursosEnProceso.map(inscripcion => {
              const curso = inscripcion.course;
              if (!curso) return null;
              return (
                <div
                  key={inscripcion.id}
                  className="cursor-pointer rounded-lg border border-gray-300 p-4 shadow hover:shadow-lg transition"
                  onClick={() => abrirDialogo(curso)}
                >
                  <h3 className="font-bold text-lg mb-2">{curso.name || curso.title}</h3>
                  <p className="text-sm text-yellow-600 font-semibold">En proceso</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <hr />

      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Cursos terminados</h2>
        {cursosCompletados.length === 0 ? (
          <p className="text-gray-500">No tienes cursos terminados.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cursosCompletados.map(inscripcion => {
              const curso = inscripcion.course;
              if (!curso) return null;
              return (
                <div
                  key={inscripcion.id}
                  className="cursor-pointer rounded-lg border border-gray-300 p-4 shadow hover:shadow-lg transition"
                  onClick={() => abrirDialogo(curso)}
                >
                  <h3 className="font-bold text-lg mb-2">{curso.name || curso.title}</h3>
                  <p className="text-sm text-green-600 font-semibold">Completado</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg sm:mx-auto">
          <DialogHeader>
            <DialogTitle>{cursoSeleccionado ? cursoSeleccionado.name || cursoSeleccionado.title : ''}</DialogTitle>
            <DialogDescription>Estadísticas del curso</DialogDescription>
          </DialogHeader>

          {estadisticasCurso.length > 0 ? (
            <div className="mt-4 space-y-4 max-h-96 overflow-y-auto">
              {estadisticasCurso.map((stat, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-2">
                  <p><strong>Test ID:</strong> {stat.test_id}</p>
                  <p>Total preguntas: {stat.total_questions}</p>
                  <p>Respuestas correctas: {stat.correct_answers}</p>
                  <p>
                    Precisión:{' '}
                    {stat.total_questions > 0
                      ? ((stat.correct_answers / stat.total_questions) * 100).toFixed(2)
                      : '0'}
                    %
                  </p>
                  <p>Estado: {stat.status}</p>
                  <p>Completado: {stat.completed_at ? new Date(stat.completed_at).toLocaleString() : 'No'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-red-500 font-semibold">No hay estadísticas disponibles para este curso.</p>
          )}

          <DialogFooter>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => setDialogOpen(false)}
            >
              Cerrar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
