import ShinyText from '@/components/reactBits/ShinyText/ShinyText';
import MenuDesplegable from '@/layouts/app/inicio-header-layout';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

const cursos = [
    {
        titulo: 'Desarrollo Web',
        descripcion: 'Aprende HTML, CSS y JavaScript desde cero.',
        img: "/img/carrousel1.jpg"
    },
    {
        titulo: 'Data Science',
        descripcion: 'Introducción a análisis de datos y machine learning.',
        img: "/img/carrousel2.jpg"
    },
    {
        titulo: 'Diseño UX/UI',
        descripcion: 'Crea experiencias digitales atractivas y usables.',
        img: ""
    },
];

export default function Home() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        });

        const handleScroll = () => {
            AOS.refresh();
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [indice, setIndice] = useState(0);
    const [fade, setFade] = useState(true);

    // Cambio automático cada 5 segundos
    useEffect(() => {
        const intervalo = setInterval(() => {
            setFade(false); // Inicia fade out
            setTimeout(() => {
                setIndice((prev) => (prev === cursos.length - 1 ? 0 : prev + 1));
                setFade(true); // Fade in
            }, 500); // duración de la animación
        }, 5000);

        return () => clearInterval(intervalo);
    }, []);

    const cambiarIndice = (nuevoIndice: number) => {
        setFade(false);
        setTimeout(() => {
            setIndice(nuevoIndice);
            setFade(true);
        }, 500);
    };

    return (
        <>
            <header className="sticky top-0 z-50">
                <MenuDesplegable></MenuDesplegable>
            </header>

            {/* CONTENIDO */}
            <div className="flex w-full flex-col items-center justify-center" data-aos="fade-up">
                {/* Bienvenida */}
                <div className="mt-15 flex w-[78%] flex-col">
                    <h3 className="text-3xl">
                        Hola, <span className="font-bold">Jesús</span> ¡Elige tu siguiente reto!
                    </h3>
                    <ShinyText text="Muchisimos cursos te estan esperando." disabled={false} speed={5} className="custom-class" />
                </div>

                <div className="relative mx-auto mt-10 flex w-full max-w-6xl items-center justify-center p-6 select-none">
                    {/* Botón anterior */}
                    <button
                        style={{ color: 'white', fontSize: '30px' }}
                        onClick={() => cambiarIndice(indice === 0 ? cursos.length - 1 : indice - 1)}
                        className="absolute left-0 z-10 ml-2 rounded-full p-3 text-gray-700 transition-colors hover:bg-gray-400"
                        aria-label="Anterior curso"
                    >
                        ‹
                    </button>

                    {/* Contenido carrusel */}
                    <div
                    style={{ backgroundImage: `url(${cursos[indice].img})`, backgroundSize: "cover" }}
                        className={`mx-12 flex h-74 w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-white via-gray-100 to-gray-200 p-8 text-gray-800 shadow-lg transition-opacity duration-500 ${
                            fade ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <h3 className="mb-4 text-4xl font-semibold text-white">{cursos[indice].titulo}</h3>
                        <p className="max-w-xl text-center text-lg text-white">{cursos[indice].descripcion}</p>
                    </div>

                    {/* Botón siguiente */}
                    <button
                        style={{ color: 'white', fontSize: '30px' }}
                        onClick={() => cambiarIndice(indice === cursos.length - 1 ? 0 : indice + 1)}
                        className="absolute right-0 z-10 mr-2 rounded-full p-3 text-gray-700 transition-colors hover:bg-gray-400"
                        aria-label="Siguiente curso"
                    >
                        ›
                    </button>

                    {/* Indicadores */}
                    <div className="absolute mt-90 mb-2 flex gap-3">
                        {cursos.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => cambiarIndice(i)}
                                className={`h-4 w-4 rounded-full border border-gray-400 transition-colors ${
                                    i === indice ? 'bg-gray-100' : 'bg-gray-700'
                                }`}
                                aria-label={`Ir al curso ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>


        </>
    );
}
