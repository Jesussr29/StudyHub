interface Props {
    user: any;
}

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import Dock from '@/components/reactBits/Dock/Dock';
import GooeyNav from '@/components/reactBits/GooeyNav/GooeyNav';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import GoogleTranslate from '@/layouts/translate/traductor';
import { faArrowRight, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { VscAccount, VscFolder, VscHome, VscLibrary, VscSettings } from 'react-icons/vsc';

export default function MenuDesplegable() {
    const [activo, setActivo] = useState(false);
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
        { icon: <VscSettings size={18} />, label: 'Ajustes', onClick: () => alert('Ajustes') },
    ];
    

    useEffect(() => {
        document.body.style.overflow = menuAbierto ? 'hidden' : 'auto';
    }, [menuAbierto]);

    const toggleMenu = () => setMenuAbierto(!menuAbierto);

    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <header className="relative text-white shadow-md dark:bg-[#02040b]">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            <nav className="mx-auto flex w-full max-w-[90%] items-center justify-between p-4">
                {/* Izquierda: Logo */}
                <div className="flex items-center gap-2">
                    <a href="/home">
                        <img
                        src="https://res.cloudinary.com/dbw3utkij/image/upload/v1747409076/LOGOSTUDYHUB_ra6mxz.png"
                        alt="Logo"
                        className="h-15 w-auto"
                        
                    />
                    </a>
                </div>

                {/* Botón hamburguesa */}
                <button
                    onClick={toggleMenu}
                    className={`text-primary z-50 text-2xl transition-all duration-900 ${menuAbierto ? 'absolute top-12 right-20' : 'relative'}`}
                >
                    <FontAwesomeIcon icon={menuAbierto ? faTimes : faBars} />
                </button>
            </nav>

            {/* Overlay menú */}
            <div
                className={`fixed inset-0 z-40 flex overflow-y-auto transition-transform duration-900 ${menuAbierto ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Mitad izquierda: Logo */}
                <div className="bg-secondary hidden w-1/2 items-center justify-center md:flex dark:bg-[#02040b]">
                    <img
                        src="https://res.cloudinary.com/dbw3utkij/image/upload/v1747409076/LOGOSTUDYHUB_ra6mxz.png"
                        alt="Logo"
                        className="h-50 w-auto"
                    />
                </div>

                {/* Mitad derecha: Menu */}
                <div className="flex w-full flex-col justify-between bg-white px-6 py-10 md:w-1/2 dark:bg-[#0d111a]">
                    {/* Botones superiores */}
                    <div className="mb-10 hidden flex-row items-start gap-4 lg:flex">
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
                        <div className="text-primary h-[660px] space-y-6 overflow-y-auto pr-2">
                            <h1 className="flex items-center gap-3 text-3xl font-bold">
                                <FontAwesomeIcon icon={faArrowRight} className="text-primary" />
                                <a className="border-primary border-b-2 pb-1" href="/home">
                                    Inicio
                                </a>
                            </h1>

                            {/* Progreso de aprendizaje */}
                            <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-[#1a1f2b]">
                                <h2 className="mb-2 text-xl font-semibold">Progreso de aprendizaje</h2>
                                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-700">
                                    <div className="h-full bg-green-500" style={{ width: '72%' }}></div>
                                </div>
                                <p className="text-primary mt-2 text-sm">72% completado del plan general</p>
                            </div>

                            {/* Cursos activos */}
                            <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-[#1a1f2b]">
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
                            <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-[#1a1f2b]">
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
                        <div className="text-primary h-[660px] space-y-6 overflow-y-auto pr-2">
                            <h1 className="flex items-center gap-3 text-3xl font-bold">
                                <FontAwesomeIcon icon={faArrowRight} className="text-primary" />
                                <a className="border-primary border-b-2 pb-1" href="/courses">
                                    Mi Academia
                                </a>
                            </h1>

                            <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-[#1a1f2b]">
                                <h2 className="mb-2 text-xl font-semibold">Progreso General</h2>
                                <div className="h-4 w-full overflow-hidden rounded-full bg-gray-700">
                                    <div className="h-full bg-green-500" style={{ width: '65%' }}></div>
                                </div>
                                <p className="text-primary mt-2 text-sm">65% completado</p>
                            </div>

                            <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-[#1a1f2b]">
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

                            <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-[#1a1f2b]">
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
                        <div className="text-primary h-[660px] space-y-6 overflow-y-auto pr-2">
                            <h1 className="flex items-center gap-3 text-3xl font-bold">
                                <FontAwesomeIcon icon={faArrowRight} className="text-primary" />
                                <a className="border-primary border-b-2 pb-1" href="google.es">
                                    Recursos
                                </a>
                            </h1>

                            <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-[#1a1f2b]">
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

                            <div className="rounded-lg bg-gray-100 p-4 shadow dark:bg-[#1a1f2b]">
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

                            <div className="mt-10 rounded-lg bg-gray-100 p-4 shadow dark:bg-[#1a1f2b]">
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
                            <br />
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-7 mb-0 flex hidden items-center justify-between pt-2 pb-10 text-sm text-white md:pb-0 lg:flex">
                        <div className="flex items-center gap-1">
                            <button onClick={() => setDialogOpen(true)} className="text-primary rounded px-4 py-2">
                                <i className="fas fa-cog transform text-3xl transition-transform duration-300 hover:scale-110"></i>
                            </button>
                        </div>
                        <div className="text-primary flex flex-col items-center gap-2 font-bold">
                            <a href="/profile">
                                <i className="fas fa-user transform text-3xl transition-transform duration-300 hover:scale-110"></i>
                            </a>
                        </div>
                    </div>

                    <div className="flex justify-center md:absolute md:bottom-0 md:w-[44%] lg:hidden">
                        <Dock items={items2} panelHeight={68} baseItemSize={50} magnification={70} />
                    </div>

                    <div className='flex items-center gap-2 mt-4 align-center p-2 rounded-lg text-white justify-center bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors duration-300 mb-18 lg:mb-0'>
                        <GoogleTranslate />
                        <p className='text-primary'>Ajustar idioma y desactivar para quitar barra de traducción</p>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" checked={activo} onChange={() => setActivo(!activo)} className="sr-only" />
                            <div
                                className={`h-6 w-12 rounded-full bg-gray-300 transition-colors duration-300 ${
                                    activo ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                            ></div>
                            <div
                                className={`absolute top-1 left-1 h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                                    activo ? 'translate-x-6' : 'translate-x-0'
                                }`}
                            ></div>
                        </label>
                    </div>
                </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:mx-auto sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Preferencias de configuración</DialogTitle>
                        <DialogDescription>Elige idioma y modo de visualización</DialogDescription>
                    </DialogHeader>

                    <hr />

                    <div className="space-y-6">
                        <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                        <AppearanceTabs />
                    </div>

                    <hr />
                </DialogContent>
            </Dialog>

            {/* OCULTAR TRADUCCION */}
            {!activo && (
                <style>
                    {`
                    #google_translate_element {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 9999;
                    }

                    .goog-te-gadget {
                    font-family: "Roboto", sans-serif !important;
                    font-size: 12px !important;
                    text-transform: none;
                    }

                    .goog-te-gadget-simple {
                    background-color: #ffffffcc !important;
                    border: 1px solid #ccc !important;
                    padding: 4px 8px !important;
                    border-radius: 6px !important;
                    font-size: 12px !important;
                    line-height: 1.4 !important;
                    color: #333 !important;
                    cursor: pointer;
                    }

                    .goog-te-menu-value {
                    color: #333 !important;
                    }

                    .goog-te-menu-value span:nth-child(5) {
                    display: none;
                    }

                    .goog-te-menu-value span:nth-child(3) {
                    border: none !important;
                    }

                    .goog-te-gadget-icon {
                    display: none !important;
                    }

                    .goog-te-banner-frame.skiptranslate {
                    display: none !important;
                    }


                    .skiptranslate {display: none;}

                    body {
                    top: 0 !important;
                    position: relative !important;
                    }

                    .skiptranslate {display: none;}

                    @media (max-width: 667px) {
                    #google_translate_element {
                        left: 16px !important;
                        right: auto;
                        bottom: 16px;
                    }

                    .goog-te-gadget-simple {
                        width: auto !important;
                        text-align: center;
                    }
                    }

                    /* Oculta el banner que aparece arriba o abajo con las valoraciones y controles */
                    .goog-te-banner-frame.skiptranslate,
                    .goog-te-balloon-frame {
                    display: none !important;
                    }

                    /* Oculta el texto "Powered by Google Translate" que aparece abajo */
                    #goog-gt-tt, /* tooltip */
                    .goog-tooltip,
                    .goog-tooltip:hover,
                    .goog-tooltip div {
                    display: none !important;
                    background: none !important;
                    }

                    .VIpgJd-ZVi9od-aZ2wEe-wOHMyf{
                    display: none !important;
                    }

                `}
                </style>
            )}
        </header>
    );
}