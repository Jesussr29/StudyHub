interface Props {
  user: any;
}

import Dock from '@/components/reactBits/Dock/Dock';
import GooeyNav from '@/components/reactBits/GooeyNav/GooeyNav';
import { faArrowRight, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { VscAccount, VscFolder, VscHome, VscLibrary, VscSettings } from 'react-icons/vsc';

export default function MenuDesplegable({ user }: Props) {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('inicio');

    const items = [
        { label: 'Inicio', href: '#', onClick: () => setCategoriaSeleccionada('inicio') },
        { label: 'Mi academia', href: '#', onClick: () => setCategoriaSeleccionada('mi academia') },
        { label: 'Recursos', href: '#', onClick: () => setCategoriaSeleccionada('recursos') },
    ];

    const items2 = [
        { icon: <VscHome size={18} />, label: 'Inicio', onClick: () => setCategoriaSeleccionada('inicio') },
        { icon: <VscLibrary size={18} />, label: 'Mi academia', onClick: () => setCategoriaSeleccionada('mi academia') },
        { icon: <VscFolder size={18} />, label: 'Recursos', onClick: () => setCategoriaSeleccionada('recursos') },
        { icon: <VscAccount size={18} />, label: 'Perfil', onClick: () => alert('Settings!') },
        { icon: <VscSettings size={18} />, label: "Ajustes", onClick: () => alert("Ajustes") },
    ];

    useEffect(() => {
        document.body.style.overflow = menuAbierto ? 'hidden' : 'auto';
    }, [menuAbierto]);

    const toggleMenu = () => setMenuAbierto(!menuAbierto);

    return (
        
        <header className="relative bg-[#02040b] text-white shadow-md">
            <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            />
            <nav className="mx-auto flex w-full max-w-6xl items-center justify-between p-4">
                {/* Izquierda: Logo */}
                <div className="flex items-center gap-2">
                    <img
                        src="https://res.cloudinary.com/dbw3utkij/image/upload/v1747409076/LOGOSTUDYHUB_ra6mxz.png"
                        alt="Logo"
                        className="h-15 w-auto"
                    />
                </div>

                {/* Botón hamburguesa */}
                <button
                    onClick={toggleMenu}
                    className={`z-50 text-2xl text-white transition-all duration-900 ${menuAbierto ? 'absolute top-12 right-20' : 'relative'}`}
                >
                    <FontAwesomeIcon icon={menuAbierto ? faTimes : faBars} />
                </button>
            </nav>

            {/* Overlay menú */}
            <div
                className={`fixed inset-0 z-40 flex overflow-y-auto transition-transform duration-900 ${menuAbierto ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Mitad izquierda: Logo */}
                <div className="hidden w-1/2 items-center justify-center bg-[#02040b] md:flex">
                    <img
                        src="https://res.cloudinary.com/dbw3utkij/image/upload/v1747409076/LOGOSTUDYHUB_ra6mxz.png"
                        alt="Logo"
                        className="h-50 w-auto"
                    />
                </div>

                {/* Mitad derecha: Menú */}
                <div className="flex w-full flex-col justify-between bg-[#0d111a] px-6 py-10 md:w-1/2">
                    {/* Botones superiores */}
                    <div className="mb-10 mb-40 flex hidden flex-col items-start gap-4 md:mb-10 md:block md:flex-row">
                        <div style={{ height: '50px', position: 'relative', textAlign: 'center' }}>
                            <GooeyNav
                                items={items}
                                particleCount={15}
                                particleDistances={[90, 10]}
                                particleR={100}
                                initialActiveIndex={0}
                                animationTime={600}
                                timeVariance={300}
                                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                            />
                        </div>
                    </div>

                    {categoriaSeleccionada === 'inicio' && (
                        <div className="h-[660px] space-y-6 overflow-y-auto pr-2 text-white">
                            <h1 className="flex items-center gap-3 text-3xl font-bold">
                                <FontAwesomeIcon icon={faArrowRight} className="text-white" />
                                <a className="border-b-2 border-white pb-1" href="/home">
                                    Inicio
                                </a>
                            </h1>

                            {/* Progreso de aprendizaje */}
                            <div className="rounded-lg bg-[#1a1f2b] p-4 shadow">
                                <h2 className="mb-2 text-xl font-semibold">Progreso de aprendizaje</h2>
                                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-700">
                                    <div className="h-full bg-green-500" style={{ width: '72%' }}></div>
                                </div>
                                <p className="mt-2 text-sm text-gray-300">72% completado del plan general</p>
                            </div>

                            {/* Cursos activos */}
                            <div className="rounded-lg bg-[#1a1f2b] p-4 shadow">
                                <h2 className="mb-3 text-xl font-semibold">Cursos activos</h2>
                                <ul className="space-y-3">
                                    <li className="flex items-center justify-between">
                                        <span>Introducción a PHP</span>
                                        <button className="rounded-xl bg-green-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-green-700">
                                            Continuar
                                        </button>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>Laravel Intermedio</span>
                                        <button className="rounded-xl bg-yellow-500 px-3 py-1 text-xs font-semibold text-black transition hover:bg-yellow-600">
                                            Revisar
                                        </button>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>React y Tailwind</span>
                                        <button className="rounded-xl bg-purple-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-purple-700">
                                            Empezar
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Últimos tests realizados */}
                            <div className="rounded-lg bg-[#1a1f2b] p-4 shadow">
                                <h2 className="mb-3 text-xl font-semibold">Últimos Tests</h2>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between">
                                        <span>Test Fundamentos PHP</span>
                                        <span className="font-bold text-green-400">85%</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Test Routing en Laravel</span>
                                        <span className="font-bold text-yellow-400">60%</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Test Componentes React</span>
                                        <span className="font-bold text-red-400">35%</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Contenido según categoría */}
                    {categoriaSeleccionada === 'mi academia' && (
                        <div className="h-[660px] space-y-6 overflow-y-auto pr-2 text-white">
                            <h1 className="flex items-center gap-3 text-3xl font-bold">
                                <FontAwesomeIcon icon={faArrowRight} className="text-white" />
                                <a className="border-b-2 border-white pb-1" href="google.es">
                                    Mi Academia
                                </a>
                            </h1>

                            <div className="rounded-lg bg-[#1a1f2b] p-4 shadow">
                                <h2 className="mb-2 text-xl font-semibold">Progreso General</h2>
                                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-700">
                                    <div className="h-full bg-green-500" style={{ width: '65%' }}></div>
                                </div>
                                <p className="mt-2 text-sm">65% completado</p>
                            </div>

                            <div className="rounded-lg bg-[#1a1f2b] p-4 shadow">
                                <h2 className="mb-2 text-xl font-semibold">Mis Cursos</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-center justify-between">
                                        <span>Introducción a JavaScript</span>
                                        <button className="text-sm text-blue-400 hover:underline">Continuar</button>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>HTML y CSS Básico</span>
                                        <button className="text-sm text-blue-400 hover:underline">Revisar</button>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>React para Principiantes</span>
                                        <button className="text-sm text-blue-400 hover:underline">Empezar</button>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-lg bg-[#1a1f2b] p-4 shadow">
                                <h2 className="mb-2 text-xl font-semibold">Últimos Tests</h2>
                                <ul className="space-y-2">
                                    <li className="flex justify-between">
                                        <span>Test HTML</span>
                                        <span className="font-bold text-green-400">80%</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Test JavaScript</span>
                                        <span className="font-bold text-yellow-400">65%</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Test CSS</span>
                                        <span className="font-bold text-red-400">40%</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {categoriaSeleccionada === 'recursos' && (
                        <div className="h-[660px] space-y-6 overflow-y-auto pr-2 text-white">
                            <h1 className="flex items-center gap-3 text-3xl font-bold">
                                <FontAwesomeIcon icon={faArrowRight} className="text-white" />
                                <a className="border-b-2 border-white pb-1" href="google.es">
                                    Recursos
                                </a>
                            </h1>

                            <div className="rounded-lg bg-[#1a1f2b] p-4 shadow">
                                <h2 className="mb-2 text-xl font-semibold">Documentos PDF</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-center justify-between">
                                        <span>Resumen de JavaScript</span>
                                        <a href="/recursos/javascript.pdf" className="text-blue-400 hover:underline">
                                            Descargar
                                        </a>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>Guía HTML y CSS</span>
                                        <a href="/recursos/html-css.pdf" className="text-blue-400 hover:underline">
                                            Descargar
                                        </a>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span>Tips de React</span>
                                        <a href="/recursos/react-tips.pdf" className="text-blue-400 hover:underline">
                                            Descargar
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-lg bg-[#1a1f2b] p-4 shadow">
                                <h2 className="mb-2 text-xl font-semibold">Videos Recomendados</h2>
                                <ul className="space-y-2">
                                    <li>
                                        <a
                                            href="https://www.youtube.com/watch?v=PkZNo7MFNFg"
                                            target="_blank"
                                            className="text-blue-400 hover:underline"
                                            rel="noopener noreferrer"
                                        >
                                            Curso JavaScript Básico (freeCodeCamp)
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.youtube.com/watch?v=1Rs2ND1ryYc"
                                            target="_blank"
                                            className="text-blue-400 hover:underline"
                                            rel="noopener noreferrer"
                                        >
                                            HTML y CSS en 1 Hora
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.youtube.com/watch?v=EMfFdv1wos4"
                                            target="_blank"
                                            className="text-blue-400 hover:underline"
                                            rel="noopener noreferrer"
                                        >
                                            React desde Cero
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-10 rounded-lg bg-[#1a1f2b] p-4 shadow">
                                <h2 className="mb-2 text-xl font-semibold">Herramientas Útiles</h2>
                                <ul className="space-y-2">
                                    <li>
                                        <a
                                            href="https://codepen.io/"
                                            target="_blank"
                                            className="text-blue-400 hover:underline"
                                            rel="noopener noreferrer"
                                        >
                                            CodePen
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://jsfiddle.net/"
                                            target="_blank"
                                            className="text-blue-400 hover:underline"
                                            rel="noopener noreferrer"
                                        >
                                            JSFiddle
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://devdocs.io/"
                                            target="_blank"
                                            className="text-blue-400 hover:underline"
                                            rel="noopener noreferrer"
                                        >
                                            DevDocs
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-10 flex items-center justify-between pt-6 pb-10 text-sm text-white md:pb-0 hidden md:flex
">
                        <div className="flex items-center gap-1">
                            <FontAwesomeIcon icon="globe" className="text-xs" />
                             <i className="fas fa-cog text-3xl transform transition-transform duration-300 hover:scale-110"></i>


                            <FontAwesomeIcon icon="chevron-down" className="ml-1 text-xs" />
                        </div>
                        <div className="flex flex-col items-center gap-2 font-bold">
                            <i className="fas fa-user text-3xl transform transition-transform duration-300 hover:scale-110"></i>
                        </div>
                    </div>

                    <div className="flex items-center md:hidden">
                        <Dock items={items2} panelHeight={68} baseItemSize={50} magnification={70} />
                    </div>
                </div>
            </div>
        </header>
    );
}
