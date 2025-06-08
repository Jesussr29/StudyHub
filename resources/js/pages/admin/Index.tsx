import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuDesplegable from '@/layouts/app/inicio-header-layout';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { router, usePage } from '@inertiajs/react';
import { ArrowDownToLine, Ban, CheckCircle, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
    user: any;
    students: any[];
    teachers: any[];
    courses: any[];
}

export default function AdminIndex({ user, students, teachers, courses }: Props) {
    const [previewPdf, setPreviewPdf] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { filters = {} } = usePage().props;

    const [tab, setTab] = useState('students');
    const [studentSearch, setStudentSearch] = useState(filters.studentSearch || '');
    const [teacherSearch, setTeacherSearch] = useState(filters.teacherSearch || '');
    const [courseSearch, setCourseSearch] = useState(filters.courseSearch || '');

    const search = (type: string, value: string) => {
        const params: any = {
            studentSearch,
            teacherSearch,
            courseSearch,
            tab,
        };
        params[type] = value;

        router.get('/admin', params, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (tab === 'students') {
                search('studentSearch', studentSearch);
            } else if (tab === 'teachers') {
                search('teacherSearch', teacherSearch);
            } else if (tab === 'courses') {
                search('courseSearch', courseSearch);
            }
        }, 300); // debounce de 300ms

        return () => clearTimeout(timeout);
    }, [studentSearch, teacherSearch, courseSearch, tab]);

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
            {(type === 'students' || type === 'teachers') && (
                <>
                    <Button variant="outline" size="icon" onClick={() => router.get(`/admin/${item.id}/editUser`)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteUser(item.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant={item.isBanned ? 'secondary' : 'outline'} size="icon" onClick={() => handleBan(item.id)}>
                        {item.isBanned ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                    </Button>
                </>
            )}

            {type === 'courses' && (
                <>
                    <Button variant="outline" size="icon" onClick={() => router.get(`/admin/${item.id}/editCourse`)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDeleteCourse(item.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant={item.isHidden ? 'secondary' : 'outline'} size="icon" onClick={() => handleHide(item.id)}>
                        {item.isHidden ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                    </Button>
                </>
            )}
        </div>
    );

    const closeImageModal = () => setPreviewImage(null);
    const closeModal = () => setPreviewPdf(null);

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
                                <th key={key} className="text-muted-foreground px-4 py-2 text-left text-sm font-medium">
                                    {key}
                                </th>
                            ))}
                            <th className="text-muted-foreground px-4 py-2 text-left text-sm font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-muted divide-y">
                        {data.map((item, idx) => (
                            <tr key={idx} className="hover:bg-accent">
                                {keys.map((key) => (
                                    <td key={key} className="text-foreground px-4 py-2 text-sm">
                                        {key === 'image' ? (
                                            item[key] && item[key].trim() !== 'null' && item[key].trim() !== '' ? (
                                                <img
                                                    src={item[key]}
                                                    alt={`${item.name} imagen`}
                                                    className="h-10 w-10 cursor-pointer rounded-full object-cover"
                                                    onClick={() => setPreviewImage(item[key])}
                                                    title="Ver imagen ampliada"
                                                />
                                            ) : (
                                                <span className="text-sm text-gray-500 italic">No hay imagen</span>
                                            )
                                        ) : key === 'pdf' ? (
                                            item[key] && item[key].trim() !== 'null' && item[key].trim() !== '' ? (
                                                <div className="flex min-w-30 flex-row justify-center gap-3 space-y-1">
                                                    <button
                                                        onClick={() => setPreviewPdf(item[key])}
                                                        className="rounded transition-shadow hover:shadow-lg"
                                                        title="Ver PDF"
                                                        type="button"
                                                    >
                                                        <FontAwesomeIcon icon={faFilePdf} className="text-[1.4rem]" />
                                                    </button>
                                                    <a
                                                        href={item[key]}
                                                        download
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-blue-600 underline"
                                                    >
                                                        <ArrowDownToLine />
                                                    </a>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-500 italic">No hay pdf</span>
                                            )
                                        ) : /created|updated|date/i.test(key) && item[key] ? (
                                            (() => {
                                                const parsedDate = new Date(item[key]);
                                                return isNaN(parsedDate)
                                                    ? String(item[key] ?? '')
                                                    : parsedDate.toLocaleDateString('es-ES', {
                                                          day: '2-digit',
                                                          month: 'short',
                                                          year: 'numeric',
                                                      });
                                            })()
                                        ) : (
                                            String(item[key] ?? '')
                                        )}
                                    </td>
                                ))}
                                <td className="px-4 py-2">{renderActions(item, type)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {previewImage && (
                    <div className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black" onClick={closeImageModal}>
                        <div className="relative max-h-[90vh] w-full max-w-3xl rounded bg-white p-4 shadow-lg" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={closeImageModal}
                                className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-gray-900"
                                title="Cerrar"
                                type="button"
                            >
                                &times;
                            </button>
                            <img src={previewImage} alt="Imagen ampliada" className="max-h-[80vh] max-w-full rounded object-contain" />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <header className="bg-secondary sticky top-0 z-50 shadow">
                <MenuDesplegable />
            </header>

            <main className="relative mx-auto max-w-[90%] p-6">
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
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={studentSearch}
                                    onChange={(e) => setStudentSearch(e.target.value)}
                                    placeholder="Buscar estudiante..."
                                    className="rounded border px-3 py-1 text-sm"
                                />
                                <Button>Agregar Estudiante</Button>
                            </div>
                        </div>
                        {renderTable(students, 'students')}
                    </TabsContent>

                    <TabsContent value="teachers">
                        <div className="mb-2 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Profesores</h2>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={teacherSearch}
                                    onChange={(e) => setTeacherSearch(e.target.value)}
                                    placeholder="Buscar profesor..."
                                    className="rounded border px-3 py-1 text-sm"
                                />
                                <Button>Agregar Profesor</Button>
                            </div>
                        </div>
                        {renderTable(teachers, 'teachers')}
                    </TabsContent>

                    <TabsContent value="courses">
                        <div className="mb-2 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Cursos</h2>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={courseSearch}
                                    onChange={(e) => setCourseSearch(e.target.value)}
                                    placeholder="Buscar curso..."
                                    className="rounded border px-3 py-1 text-sm"
                                />
                                <Button>Agregar Curso</Button>
                            </div>
                        </div>
                        {renderTable(courses, 'courses')}
                    </TabsContent>
                </Tabs>
            </main>

            {previewPdf && (
                <div className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black" onClick={closeModal}>
                    <div className="relative max-h-[90vh] w-full max-w-4xl rounded bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-gray-900"
                            title="Cerrar"
                            type="button"
                        >
                            &times;
                        </button>
                        <iframe src={previewPdf} className="h-[90vh] w-full rounded-b" title="PDF ampliado" />
                        <div className="p-2 text-right">
                            <a
                                href={previewPdf}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                            >
                                Descargar PDF
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
