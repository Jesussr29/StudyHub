interface Props {
    user: any;
    courses: any[];
}

import MenuDesplegable from '@/layouts/app/inicio-header-layout';
import { router } from '@inertiajs/react';
import 'aos/dist/aos.css';

const formatearDuración = (minutos: number): string => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;

    if (horas === 0) {
        return `${mins} minutos`;
    }

    if (horas == 1) {
        return `${horas} hora y ${mins} minutos`;
    }

    return `${horas} horas y ${mins} minutos`;
};

const manejarClickCurso = (id: number) => {
    router.get(`/course/${id}`);
};

export default function Courses({ user, courses }: Props) {
    return (
        <>
            <header className="bg-secondary sticky top-0 z-50 h-auto">
                <MenuDesplegable />
            </header>

            <main className="bg-secondary min-h-screen px-6 py-10 md:px-20">
                <h1 className="mb-6 text-3xl font-semibold">Elige qué aprender {user.name}</h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((curso) => (
                        <div
                            className="border-primary cursor-pointer overflow-hidden rounded-xl border bg-white shadow-lg transition duration-300 hover:shadow-2xl dark:border-gray-600 dark:bg-[#1a1f2b]"
                            onClick={() => manejarClickCurso(curso.id)}
                        >
                           {curso.image !== 'null' ? (
                             <img
                                src={`/${curso.image}`}
                                alt={curso.name}
                                className="h-40 w-full bg-gray-100 object-contain object-cover"
                            />
                           ) : (
                             <img
                                src={'https://res.cloudinary.com/dbw3utkij/image/upload/v1747409076/LOGOSTUDYHUB_ra6mxz.png'}
                                alt={curso.name}
                                className="h-40 w-full bg-gray-100 object-contain object-cover"
                            />
                           )}
                            <div className="p-4">
                                <h2 className="text-primary text-2xl font-bold">{curso.name}</h2>
                                <p className="text-primary/60 mt-1 text-sm">{formatearDuración(curso.duration)}</p>
                                <div className="mt-4 flex items-center">
                                    <span className="mr-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">CURSO</span>
                                    <span className="text-sm text-yellow-500">
                                        ★★★★★
                                        {/* {"★".repeat(Math.floor(curso.rating))}
                                    {"☆".repeat(5 - Math.floor(curso.rating))} */}
                                    </span>
                                    <span className="ml-2 text-sm text-gray-600">{/* ({curso.reviews}) */}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
