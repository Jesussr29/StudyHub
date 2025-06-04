import MenuDesplegable from '@/layouts/app/inicio-header-layout';
import { Head } from '@inertiajs/react';

interface Props {
    course: any;
    profesor: any;
}

const formatearDuración = (minutos: number): string => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;

    if (horas === 0) {
        return `${mins} minutos`;
    }

    return `${horas} horas y ${mins} minutos`;
};

export default function Course({ course, profesor }: Props) {
    return (
        <>
            <Head title={course.name} />
            <header className="bg-secondary sticky top-0 z-50 shadow">
                <MenuDesplegable />
            </header>

            <main className="dark:bg-secondary min-h-screen bg-white from-white to-gray-100 p-6">
                <div className="mx-auto grid max-w-[95%] items-start gap-6 md:grid-cols-3">
                    {/* Card del curso */}
                    <div className="text-primary relative flex h-full flex-col justify-center overflow-hidden rounded-xl bg-gray-100 p-8 shadow-lg md:col-span-2 dark:bg-[#101828]">
                        <div className="text-secondary absolute top-6 right-6 hidden rounded-lg bg-indigo-700 px-4 py-1 text-sm font-semibold shadow lg:block dark:text-white">
                            🎓 Comienza tu aprendizaje
                        </div>
                        <h1 className="mb-2 text-4xl font-bold">{course.name}</h1>
                        <div className="mb-4 flex items-center space-x-2">
                            <span className="text-xl text-yellow-400">4,5</span>
                            <span>⭐️⭐️⭐️⭐️⭐️</span>
                            <span className="text-primary/80 text-sm">(3066 valoraciones)</span>
                        </div>
                        <p className="text-primary/80 mb-6">{course.description}</p>
                        <p className="text-primary/80 mb-6">⏱️ {formatearDuración(course.duration)} </p>

                        <div className="flex space-x-4">
                            <button className="cursor-pointer rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition duration-300 hover:bg-purple-700">
                                Comenzar
                            </button>
                            <button className="cursor-pointer rounded-lg border border-purple-400 px-6 py-2 font-semibold text-purple-400 transition duration-300 hover:bg-purple-900 hover:text-white">
                                Añadir a favoritos
                            </button>
                        </div>
                    </div>

                    {/* Instructor */}
                    <div className="flex h-full flex-col items-center justify-center rounded-xl bg-[#f3f4f6] p-6 text-center shadow-lg dark:bg-[#101828]">
                        <div className="relative">
                            <img
                                src="/img/carrousel1.jpg" // course.instructor.avatar
                                alt="Foto del instructor"
                                className="h-32 w-32 rounded-full border-4 border-purple-500 object-cover shadow-md"
                            />
                            <span className="absolute right-0 bottom-0 h-5 w-5 animate-pulse rounded-full border-2 border-white bg-green-500 dark:border-[#101828]" />
                        </div>

                        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{profesor.name}</h2>
                        <p className="mt-1 text-sm font-semibold tracking-wide text-purple-600 uppercase">Experto en Desarrollo</p>

                        <p className="mt-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                            {profesor.description ? profesor.description : 'El profesor aún no ha proporcionado una descripción.'}
                        </p>

                        <div className="mt-5 flex justify-center gap-4">
                            <a href="#" className="text-xl text-purple-600 transition hover:text-purple-800">
                                🐦
                            </a>
                            <a href="#" className="text-xl text-purple-600 transition hover:text-purple-800">
                                💼
                            </a>
                            <a href="#" className="text-xl text-purple-600 transition hover:text-purple-800">
                                🔗
                            </a>
                        </div>
                    </div>
                </div>

                {/* Temario */}
                <section className="mx-auto mt-10 max-w-[95%] rounded-xl bg-gray-100 p-8 shadow-lg transition-all dark:bg-[#101828]">
                    <h3 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">📚 Temario</h3>
                    <p className="mb-6 text-gray-700 dark:text-gray-300">
                        Aquí podrás <span className="font-semibold text-purple-600">descargarte los PDF</span> de los temas y{' '}
                        <span className="font-semibold text-purple-600">empezar un tipo test</span> para practicar lo aprendido.
                    </p>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Tema 1 */}
                        <li className="flex flex-col py-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">INTRODUCCIÓN AL CURSO</p>
                                <p className="text-primary/60 mt-1 text-sm dark:text-gray-400">🎥 Presentación – 4 minutos</p>
                            </div>
                            <div className="mt-4 flex gap-4 md:mt-0">
                                <a
                                    href="/pdfs/introduccion-al-curso.pdf"
                                    download
                                    className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white transition hover:bg-purple-700"
                                >
                                    📄 Descargar PDF
                                </a>
                                <a
                                    href="/test"
                                    className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700"
                                >
                                    🧠 Empezar Test
                                </a>
                            </div>
                        </li>

                        {/* Tema 2 */}
                        <li className="flex flex-col py-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">INTRODUCCIÓN A LA PROGRAMACIÓN</p>
                                <p className="text-primary/60 mt-1 text-sm dark:text-gray-400">💻 Fundamentos – 20 minutos</p>
                            </div>
                            <div className="mt-4 flex gap-4 md:mt-0">
                                <a
                                    href="/pdfs/introduccion-a-la-programacion.pdf"
                                    download
                                    className="rounded-lg bg-purple-600 px-4 py-2 text-sm text-white transition hover:bg-purple-700"
                                >
                                    📄 Descargar PDF
                                </a>
                                <a
                                    href="/tests/test-programacion"
                                    className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-700"
                                >
                                    🧠 Empezar Test
                                </a>
                            </div>
                        </li>
                    </ul>
                </section>
            </main>
        </>
    );
}
