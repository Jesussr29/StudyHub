import MenuDesplegable from '@/layouts/app/inicio-header-layout';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

const preguntas = [
    {
        enunciado: '¿Cuál es la capital de Francia?',
        opciones: ['Madrid', 'Berlín', 'París', 'Lisboa'],
        respuestaCorrecta: 2,
    },
    {
        enunciado: '¿Qué elemento tiene el símbolo H?',
        opciones: ['Hierro', 'Helio', 'Hidrógeno', 'Hassio'],
        respuestaCorrecta: 2,
    },
    {
        enunciado: '¿Cuál es el resultado de 5 x 3?',
        opciones: ['15', 'mil botellines', '10', '13'],
        respuestaCorrecta: 0,
    },
    {
        enunciado: '¿Quién pintó La Última Cena?',
        opciones: ['Miguel Ángel', 'Picasso', 'Dalí', 'Da Vinci'],
        respuestaCorrecta: 3,
    },
    {
        enunciado: '¿Quién pintó La Última Cena?',
        opciones: ['Miguel Ángel', 'Picasso', 'Dalí', 'Da Vinci'],
        respuestaCorrecta: 3,
    },
    {
        enunciado: '¿Quién pintó La Última Cena?',
        opciones: ['Miguel Ángel', 'Picasso', 'Dalí', 'Da Vinci'],
        respuestaCorrecta: 3,
    },
    {
        enunciado: '¿Quién pintó La Última Cena?',
        opciones: ['Miguel Ángel', 'Picasso', 'Dalí', 'Da Vinci'],
        respuestaCorrecta: 3,
    },
    {
        enunciado: '¿Quién pintó La Última Cena?',
        opciones: ['Miguel Ángel', 'Picasso', 'Dalí', 'Da Vinci'],
        respuestaCorrecta: 3,
    },
    {
        enunciado: '¿Quién pintó La Última Cena?',
        opciones: ['Miguel Ángel', 'Picasso', 'Dalí', 'Da Vinci'],
        respuestaCorrecta: 3,
    },
    {
        enunciado: '¿Quién pintó La Última Cena?',
        opciones: ['Miguel Ángel', 'Picasso', 'Dalí', 'Da Vinci'],
        respuestaCorrecta: 3,
    },
    {
        enunciado: '¿Quién pintó La Última Cena?',
        opciones: ['Miguel Ángel', 'Picasso', 'Dalí', 'Da Vinci'],
        respuestaCorrecta: 3,
    },
];

export default function Test() {
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [respuestas, setRespuestas] = useState<(number | null)[]>(Array(preguntas.length).fill(null));
    const [segundosRestantes, setSegundosRestantes] = useState(30 * 60);
    const [tiempoTerminado, setTiempoTerminado] = useState(false);

    useEffect(() => {
        if (segundosRestantes <= 0) {
            setTiempoTerminado(true);
            return;
        }
        const intervalo = setInterval(() => {
            setSegundosRestantes((s) => s - 1);
        }, 1000);
        return () => clearInterval(intervalo);
    }, [segundosRestantes]);

    const formatearTiempo = (s: number) => {
        const min = Math.floor(s / 60)
            .toString()
            .padStart(2, '0');
        const seg = (s % 60).toString().padStart(2, '0');
        return `${min}:${seg}`;
    };

    const seleccionarRespuesta = (indiceRespuesta: number) => {
        if (tiempoTerminado) return;
        const nuevasRespuestas = [...respuestas];
        nuevasRespuestas[preguntaActual] = nuevasRespuestas[preguntaActual] === indiceRespuesta ? null : indiceRespuesta;
        setRespuestas(nuevasRespuestas);
    };

    const terminarTest = () => {
        alert('Test terminado. Puedes procesar las respuestas aquí.');
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 shadow-md">
                <MenuDesplegable />
            </header>

            <main className="mx-auto grid max-w-[90%] grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-3">
                {/* Pregunta actual */}
                <div className="shadow-neumorph rounded-3xl border border-gray-200 bg-white p-8 lg:col-span-2">
                    <h2 className="mb-6 text-3xl font-semibold text-gray-900">
                        Pregunta {preguntaActual + 1}: <span className="font-light">{preguntas[preguntaActual].enunciado}</span>
                    </h2>

                    <div className="space-y-5">
                        {preguntas[preguntaActual].opciones.map((opcion, index) => {
                            const seleccionada = respuestas[preguntaActual] === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => seleccionarRespuesta(index)}
                                    className={`flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left transition-shadow ${
                                        seleccionada
                                            ? 'border-2 border-indigo-400 bg-indigo-100 shadow-inner'
                                            : 'border border-transparent bg-gray-50 hover:bg-indigo-50 hover:shadow-md'
                                    }`}
                                >
                                    <div
                                        className={`h-6 w-6 flex-shrink-0 rounded-full border-2 ${seleccionada ? 'border-indigo-600 bg-indigo-600' : 'border-gray-400'}`}
                                    ></div>
                                    <span className="text-lg text-gray-800">{opcion}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-12 flex justify-between">
                        <button
                            onClick={() => setPreguntaActual((p) => Math.max(p - 1, 0))}
                            disabled={tiempoTerminado}
                            className={`rounded-lg px-6 py-3 font-semibold transition ${tiempoTerminado ? 'cursor-not-allowed bg-gray-300 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Anterior
                        </button>
                        {preguntaActual === preguntas.length - 1 ? (
                            <button
                                onClick={terminarTest}
                                disabled={tiempoTerminado}
                                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >
                                Terminar Test
                            </button>
                        ) : (
                            <button
                                onClick={() => setPreguntaActual((p) => Math.min(p + 1, preguntas.length - 1))}
                                disabled={tiempoTerminado}
                                className={`rounded-lg px-4 py-2 ${tiempoTerminado ? 'cursor-not-allowed bg-gray-300 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                            >
                                Siguiente
                            </button>
                        )}
                    </div>
                </div>

                {/* Panel derecho con contador y navegación */}
                <aside className="shadow-neumorph flex h-fit flex-col rounded-3xl border border-gray-200 bg-white p-8">
                    <h3 className="mb-6 text-xl font-bold tracking-wide text-gray-900">Preguntas</h3>

                    <div className="mb-8 text-center font-mono text-4xl font-extrabold tracking-wide text-indigo-700 select-none">
                        {formatearTiempo(segundosRestantes)}
                    </div>

                    <div className="mb-8 inline-flex flex-wrap justify-center gap-4 overflow-hidden">
                        {preguntas.map((_, i) => {
                            const respondida = respuestas[i] !== null;
                            return (
                                <button
                                    key={i}
                                    onClick={() => !tiempoTerminado && setPreguntaActual(i)}
                                    disabled={tiempoTerminado}
                                    className={`h-12 w-12 rounded-full text-lg font-semibold ${
                                        preguntaActual === i
                                            ? 'bg-indigo-700 text-white shadow-lg'
                                            : respondida
                                              ? 'bg-indigo-500 text-white shadow-sm'
                                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    } ${tiempoTerminado ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={terminarTest}
                        className="mt-auto rounded-xl bg-red-600 py-3 font-semibold text-white shadow-md transition-shadow hover:bg-red-700"
                    >
                        Terminar Test
                    </button>
                </aside>
            </main>

            {tiempoTerminado && (
                <div className="bg-opacity-60 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="mx-4 max-w-md rounded-3xl bg-white p-10 text-center shadow-2xl">
                        <h2 className="mb-5 text-3xl font-bold text-gray-900">Tiempo agotado</h2>
                        <p className="mb-8 text-lg text-gray-700">
                            El tiempo para realizar el test ha finalizado. Por favor, pulsa "Terminar Test" para continuar.
                        </p>
                        <button
                            onClick={terminarTest}
                            className="rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700"
                        >
                            Terminar Test
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
