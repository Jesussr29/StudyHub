import RotatingText from '@/components/reactBits/RotatingText/RotatingText';
import MenuDesplegable from '@/layouts/app/inicio-header-layout';
import { router } from '@inertiajs/react';
import 'aos/dist/aos.css';
import { useEffect, useMemo, useState } from 'react';

interface Props {
    user: any;
    courses: any[];
}

const formatearDuración = (minutos: number): string => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    if (horas === 0) return `${mins} minutos`;
    if (horas === 1) return `${horas} hora y ${mins} minutos`;
    return `${horas} horas y ${mins} minutos`;
};

const manejarClickCurso = (id: number) => {
    router.get(`/course/${id}`);
};

export default function Courses({ user, courses }: Props) {
    // Estados independientes para cada orden y filtro
    const [ordenDuracion, setOrdenDuracion] = useState('');
    const [ordenFecha, setOrdenFecha] = useState('');
    const [ordenRating, setOrdenRating] = useState('');
    const [soloFavoritos, setSoloFavoritos] = useState(false);
    const [ratingFiltro, setRatingFiltro] = useState(''); // Nuevo filtro de rating exacto
    const [mostrar, setMostrar] = useState(false);

    useEffect(() => {
        router.reload({ only: ['user', 'courses'] });
    }, []);

    useEffect(() => {
        const getCookie = (nombre: string) => {
            const valor = `; ${document.cookie}`;
            const partes = valor.split(`; ${nombre}=`);
            if (partes.length === 2) return partes.pop()?.split(';').shift() ?? null;
            return null;
        };

        const comprobarIdioma = () => {
            const idiomaTraducido = getCookie('googtrans');
            setMostrar(idiomaTraducido?.endsWith('/es') ?? false);
        };

        const intervalo = setInterval(comprobarIdioma, 1000);
        return () => clearInterval(intervalo);
    }, []);

    const cursosFiltrados = useMemo(() => {
        let resultado = [...courses];

        if (soloFavoritos) {
            resultado = resultado.filter((curso) => curso.is_favorite);
        }

        if (ratingFiltro !== '') {
            // Filtrar solo cursos con rating EXACTO igual al valor seleccionado
            const ratingNum = Number(ratingFiltro);
            resultado = resultado.filter((curso) => Math.floor(curso.average_rating) === ratingNum);
        }

        // Ordenar por duración
        if (ordenDuracion === 'duracion-asc') {
            resultado.sort((a, b) => a.duration - b.duration);
        } else if (ordenDuracion === 'duracion-desc') {
            resultado.sort((a, b) => b.duration - a.duration);
        }

        // Ordenar por fecha
        if (ordenFecha === 'fecha-asc') {
            resultado.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        } else if (ordenFecha === 'fecha-desc') {
            resultado.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }

        // Ordenar por rating
        if (ordenRating === 'rating-asc') {
            resultado.sort((a, b) => a.average_rating - b.average_rating);
        } else if (ordenRating === 'rating-desc') {
            resultado.sort((a, b) => b.average_rating - a.average_rating);
        }

        return resultado;
    }, [ordenDuracion, ordenFecha, ordenRating, soloFavoritos, ratingFiltro, courses]);

    return (
        <>
  <header className="bg-secondary sticky top-0 z-50 h-auto">
    <MenuDesplegable />
  </header>

  <main className="bg-secondary min-h-screen px-4 py-10 md:px-10 lg:px-20">
    <h1 className="mb-8 text-3xl font-bold text-white">¡Ponte en marcha y comienza tu curso!</h1>

{mostrar && (
  <div className="mb-8 flex flex-col items-center text-2xl sm:flex-row sm:text-3xl sm:items-center">
    <img
      src="https://flagcdn.com/w40/es.png"
      alt="Bandera de España"
      width="24"
      height="16"
      className="mb-2 sm:mb-0 sm:mr-4"
    />
    <div className="flex items-center gap-3 mb-2 sm:mb-0">
      <h1>Hola</h1> <span>{user.name}</span>
    </div>
    <RotatingText
      texts={[
        'esta es tu oportunidad de aprender.',
        'da el primer paso hacia tu futuro.',
        'nunca fue tan fácil empezar a aprender.',
        'invierte en ti, el conocimiento es poder.',
      ]}
      mainClassName="px-2 text-primary overflow-hidden py-1 justify-center rounded-lg notranslate text-center sm:text-left"
      staggerFrom={'last'}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-120%' }}
      staggerDuration={0.025}
      splitLevelClassName="overflow-hidden pb-1"
      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      rotationInterval={4000}
    />
  </div>
)}


    {/* Contenedor flex para poner filtros arriba en móvil y derecha en desktop */}
    <div className="flex flex-col-reverse lg:flex-row gap-8">
      {/* Cursos */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex-1 lg:grid-cols-3">
        {cursosFiltrados.map((curso) => (
          <div
            key={curso.id}
            className="flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:shadow-xl dark:bg-[#1a1f2b] max-h-[400px] hover:scale-102"
            onClick={() => manejarClickCurso(curso.id)}
          >
            <img
              src={
                curso.image !== 'null'
                  ? `/${curso.image}`
                  : 'https://res.cloudinary.com/dbw3utkij/image/upload/v1747409076/LOGOSTUDYHUB_ra6mxz.png'
              }
              alt={curso.name}
              className="h-40 w-full object-cover"
            />
            <div className="flex flex-grow flex-col p-4">
              <div className="mb-4">
                <h2 className="text-primary text-xl font-semibold dark:text-white">{curso.name}</h2>
                <p className="text-primary/60 mt-1 text-sm dark:text-gray-400">{formatearDuración(curso.duration)}</p>
              </div>
              <div className="mt-auto flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">CURSO</span>
                  <div className="flex items-center text-sm text-yellow-500">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const fullStars = Math.floor(curso.average_rating);
                      const hasHalfStar = curso.average_rating - fullStars >= 0.5;

                      if (index < fullStars) {
                        return (
                          <span key={index}>
                            <i className="fas fa-star"></i>{' '}
                          </span>
                        );
                      } else if (index === fullStars && hasHalfStar) {
                        return (
                          <span key={index}>
                            <i className="fas fa-star-half-alt"></i>{' '}
                          </span>
                        );
                      } else {
                        return (
                          <span key={index}>
                            <i className="far fa-star"></i>{' '}
                          </span>
                        );
                      }
                    })}
                    <span className="mt-0.5 ml-1 text-xs text-gray-500 dark:text-gray-400 notranslate">({curso.average_rating})</span>
                  </div>
                </div>
                {curso.is_favorite && <span className="text-2xl text-red-500">♥</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <aside className="h-fit rounded-xl bg-white p-6 shadow-md dark:bg-[#1a1f2b] lg:w-80">
        <h2 className="text-primary mb-6 text-2xl font-semibold dark:text-white">Filtros</h2>

        <div className="mb-6">
          <label className="text-primary mb-2 block text-sm font-medium dark:text-white">Ordenar por duración</label>
          <select
            value={ordenDuracion}
            onChange={(e) => setOrdenDuracion(e.target.value)}
            className="focus:ring-primary focus:ring-opacity-50 w-full appearance-none rounded-md bg-gray-100 px-4 py-3 text-gray-700 focus:ring-2 focus:outline-none dark:bg-[#2a2e42] dark:text-gray-200"
          >
            <option value="">-- Selecciona --</option>
            <option value="duracion-asc">Duración (menor a mayor)</option>
            <option value="duracion-desc">Duración (mayor a menor)</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="text-primary mb-2 block text-sm font-medium dark:text-white">Ordenar por fecha</label>
          <select
            value={ordenFecha}
            onChange={(e) => setOrdenFecha(e.target.value)}
            className="focus:ring-primary focus:ring-opacity-50 w-full appearance-none rounded-md bg-gray-100 px-4 py-3 text-gray-700 focus:ring-2 focus:outline-none dark:bg-[#2a2e42] dark:text-gray-200"
          >
            <option value="">-- Selecciona --</option>
            <option value="fecha-asc">Fecha (más antiguo primero)</option>
            <option value="fecha-desc">Fecha (más nuevo primero)</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="text-primary mb-2 block text-sm font-medium dark:text-white">Ordenar por rating</label>
          <select
            value={ordenRating}
            onChange={(e) => setOrdenRating(e.target.value)}
            className="focus:ring-primary focus:ring-opacity-50 w-full appearance-none rounded-md bg-gray-100 px-4 py-3 text-gray-700 focus:ring-2 focus:outline-none dark:bg-[#2a2e42] dark:text-gray-200"
          >
            <option value="">-- Selecciona --</option>
            <option value="rating-asc">Rating (menor a mayor)</option>
            <option value="rating-desc">Rating (mayor a menor)</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="text-primary mb-2 block text-sm font-medium dark:text-white">Filtrar por rating exacto</label>
          <select
            value={ratingFiltro}
            onChange={(e) => setRatingFiltro(e.target.value)}
            className="focus:ring-primary focus:ring-opacity-50 w-full appearance-none rounded-md bg-gray-100 px-4 py-3 text-gray-700 focus:ring-2 focus:outline-none dark:bg-[#2a2e42] dark:text-gray-200"
          >
            <option value="">Todos</option>
            <option value="1">1 estrella</option>
            <option value="2">2 estrellas</option>
            <option value="3">3 estrellas</option>
            <option value="4">4 estrellas</option>
            <option value="5">5 estrellas</option>
          </select>
        </div>

        <div className="mb-6 flex items-center gap-2">
          <input
            id="soloFavoritos"
            type="checkbox"
            checked={soloFavoritos}
            onChange={() => setSoloFavoritos(!soloFavoritos)}
            className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:bg-[#2a2e42]"
          />
          <label htmlFor="soloFavoritos" className="text-primary text-sm font-semibold dark:text-white">
            Mostrar solo favoritos
          </label>
        </div>
      </aside>
    </div>
  </main>
</>

    );
}
