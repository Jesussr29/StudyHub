import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuDesplegable from '@/layouts/app/inicio-header-layout';
import { router, usePage } from '@inertiajs/react';
import { Ban, CheckCircle, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    user: any;
    students: any[];
    teachers: any[];
    courses: any[];
}

export default function AdminIndex({ user, students, teachers, courses }: Props) {
    const handleBan = (id: string) => {
        if (confirm('¿Estás seguro de que deseas cambiar el estado de baneo de este usuario?')) {
            router.put(
                `/admin/${id}/ban`,
                {},
                {
                    preserveScroll: true,
                },
            );
        }
    };

    const handleHide = (id: string) => {
        if (confirm('¿Estás seguro de que deseas cambiar el estado de visibilidad de este curso?')) {
            router.put(
                `/admin/${id}/hide`,
                {},
                {
                    preserveScroll: true,
                },
            );
        }
    };

    const handleDeleteUser = (id: string) => {
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            router.delete(`/admin/${id}/user`, {
                preserveScroll: true,
            });
        }
    };

    const handleDeleteCourse = (id: string) => {
        if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
            router.delete(`/admin/${id}/course`, {
                preserveScroll: true,
            });
        }
    };

    const { props } = usePage();
    const flashMessage = props.flash?.message;

    const [message, setMessage] = useState<string | null>(flashMessage ?? null);

    useEffect(() => {
        if (flashMessage) {
            setMessage(flashMessage);

            const timeout = setTimeout(() => {
                setMessage(null);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [flashMessage]);

    const renderActions = (item: any, type: string) => (
        <div className="flex space-x-2">
            {type === 'students' || type === 'teachers' ? (
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => router.get(`/admin/${item.id}/editUser`)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteUser(item.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant={item.isBanned ? 'secondary' : 'outline'} size="icon" onClick={() => handleBan(item.id)}>
                        {item.isBanned ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                    </Button>
                </div>
            ) : type === 'courses' ? (
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => router.get(`/admin/${item.id}/editCourse`)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteCourse(item.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant={item.isBanned ? 'secondary' : 'outline'} size="icon" onClick={() => handleHide(item.id)}>
                        {item.isBanned ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                    </Button>
                </div>
            ) : null}
        </div>
    );

  const renderTable = (data: any[], type: string) => {
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground text-center">No hay datos disponibles.</p>;
  }

  const keys = Object.keys(data[0]).filter((k) => k !== 'isBanned' && k !== 'isHidden');

  return (
    <div className="mt-4 overflow-x-auto rounded-lg border">
      <table className="divide-muted bg-background min-w-full divide-y">
        <thead className="bg-muted">
          <tr>
            {keys.map((key) => (
              <th
                key={key}
                className="text-muted-foreground px-4 py-2 text-left text-sm font-medium"
              >
                {key}
              </th>
            ))}
            <th className="text-muted-foreground px-4 py-2 text-left text-sm font-medium">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-muted divide-y">
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-accent">
              {keys.map((key) => (
                <td key={key} className="text-foreground px-4 py-2 text-sm">
                  {key === 'image' && item[key] ? (
                    <img
                      src={item[key]}
                      alt={`${item.name} foto`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : key.toLowerCase().includes('date') && item[key] ? (
                    new Date(item[key]).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  ) : (
                    String(item[key])
                  )}
                </td>
              ))}
              <td className="px-4 py-2">{renderActions(item, type)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


    return (
        <>
            <header className="bg-secondary sticky top-0 z-50 shadow">
                <MenuDesplegable />
            </header>

            <main className="relative mx-auto max-w-[90%] p-6">
                {/* Mensaje flotante */}
                {message && (
                    <div className="fixed top-4 right-4 z-50">
                        <div className="max-w-sm rounded-xl border border-green-400 bg-green-100 px-4 py-2 text-sm text-green-800 shadow-lg">
                            {message}
                        </div>
                    </div>
                )}

                <h1 className="mb-6 text-3xl font-bold">Panel de Administración</h1>

                <Tabs defaultValue="students" className="w-full">
                    <TabsList className="mb-4 grid w-full grid-cols-3">
                        <TabsTrigger value="students">Estudiantes</TabsTrigger>
                        <TabsTrigger value="teachers">Profesores</TabsTrigger>
                        <TabsTrigger value="courses">Cursos</TabsTrigger>
                    </TabsList>

                    <TabsContent value="students">
                        <div className="mb-2 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Estudiantes</h2>
                            <Button>Agregar Estudiante</Button>
                        </div>
                        {renderTable(students, 'students')}
                    </TabsContent>

                    <TabsContent value="teachers">
                        <div className="mb-2 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Profesores</h2>
                            <Button>Agregar Profesor</Button>
                        </div>
                        {renderTable(teachers, 'teachers')}
                    </TabsContent>

                    <TabsContent value="courses">
                        <div className="mb-2 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Cursos</h2>
                            <Button>Agregar Curso</Button>
                        </div>
                        {renderTable(courses, 'courses')}
                    </TabsContent>
                </Tabs>
            </main>
        </>
    );
}
