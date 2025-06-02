interface Props {
  user: any;
  courses: any[];
}


import ShinyText from '@/components/reactBits/ShinyText/ShinyText';
import MenuDesplegable from '@/layouts/app/inicio-header-layout';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from 'react';

export default function Home({ user, courses }: Props) {

    console.log('user', user.name);

const imagenes = [
  '/img/carrousel1.jpg',
  '/img/carrousel2.jpg',
  '/img/carrusel3.jpg',
];

const cursos = courses.slice(0, 3).map((curso, i) => ({
  titulo: curso.name,
  descripcion: curso.description ?? curso.name,
  img: imagenes[i], // imagen fija según el índice
}));

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
    const intervaloRef = useRef<NodeJS.Timeout | null>(null);

    const cambiarIndice = (nuevoIndice: number) => {
        setFade(false);
        setTimeout(() => {
            setIndice(nuevoIndice);
            setFade(true);
        }, 500);
    };

    // Reiniciar intervalo cada vez que cambie el índice
    useEffect(() => {
        if (intervaloRef.current) clearInterval(intervaloRef.current);

        intervaloRef.current = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndice((prev) => (prev === cursos.length - 1 ? 0 : prev + 1));
                setFade(true);
            }, 500);
        }, 5000);

        return () => {
            if (intervaloRef.current) clearInterval(intervaloRef.current);
        };
    }, [indice]);

    return (
        <>
            <header className="sticky top-0 z-50">
                <MenuDesplegable user={user}></MenuDesplegable>
            </header>

            {/* CONTENIDO */}
            <div className="flex w-full flex-col items-center justify-center" data-aos="fade-up">
                {/* Bienvenida */}
                <div className="mt-15 flex w-[78%] flex-col">
                    <h3 className="text-3xl">
                        Hola, <span className="font-bold">{user.name}</span> ¡Elige tu siguiente reto!
                    </h3>
                    <ShinyText text="Muchisimos cursos te estan esperando." disabled={false} speed={5} className="custom-class" />
                </div>

                <div className="relative mx-auto mt-10 flex w-full max-w-6xl items-center justify-center p-6 select-none">
                    {/* Botón anterior */}
                    <button
                        style={{ color: 'white' }}
                        onClick={() => cambiarIndice(indice === 0 ? cursos.length - 1 : indice - 1)}
                        className="absolute left-0 z-10 ml-2 rounded-full p-3 text-gray-700 transition-colors hover:bg-gray-400"
                        aria-label="Anterior curso"
                    >
                        <div style={{ color: 'white', fontSize: '30px', marginTop: '-3px' }}>‹</div>
                    </button>

                    {/* Contenido carrusel */}
                    <div
                        style={{ backgroundImage: `url(${cursos[indice].img})`, backgroundSize: 'cover' }}
                        className={`mx-12 flex h-74 w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-white via-gray-100 to-gray-200 p-8 text-gray-800 shadow-lg transition-opacity duration-500 ${
                            fade ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <h3 className="mb-4 text-4xl font-semibold text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">{cursos[indice].titulo}</h3>
                        <p className="max-w-xl text-center text-lg text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">{cursos[indice].descripcion}</p>
                        <button className="mt-6 rounded-xl bg-yellow-500 px-6 py-2 font-semibold text-black shadow-md transition duration-300 ease-in-out hover:bg-yellow-600">
                            Comenzar curso
                        </button>
                    </div>

                    {/* Botón siguiente */}
                    <button
                        style={{ color: 'white' }}
                        onClick={() => cambiarIndice(indice === cursos.length - 1 ? 0 : indice + 1)}
                        className="aling-center absolute right-0 z-10 mr-2 flex items-center rounded-full p-3 text-gray-700 transition-colors hover:bg-gray-400"
                        aria-label="Siguiente curso"
                    >
                        <div style={{ color: 'white', fontSize: '30px', marginTop: '-3px' }}>›</div>
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
