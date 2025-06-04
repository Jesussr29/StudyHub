interface Props {
  user: any;
  courses: any[];
}

import { useEffect, useState } from "react";
import MenuDesplegable from "@/layouts/app/inicio-header-layout";
import "aos/dist/aos.css";
import { router } from "@inertiajs/react";

const formatearDuración = (minutos: number): string => {
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;

  if (horas === 0) {
    return `${mins} minutos`;
  }
  return `${horas} horas y ${mins} minutos`;
};

const manejarClickCurso = (id: number) => {
    router.get(`/course/${id}`); 
};


export default function Courses({ user, courses }: Props) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-secondary h-auto">
        <MenuDesplegable />
      </header>

      <main className="px-6 md:px-20 py-10 bg-secondary min-h-screen">
        <h1 className="text-3xl font-semibold mb-6">Elige qué aprender {user.name}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((curso) => (
            <div
              className="cursor-pointer dark:bg-[#1a1f2b] bg-white shadow-lg rounded-xl overflow-hidden border border-primary dark:border-gray-600 hover:shadow-2xl transition duration-300"
              onClick={() => manejarClickCurso(curso.id)}
            >
              <img
                src="/img/carrousel1.jpg"
                // alt={curso.title}
                className="w-full h-40 object-contain bg-gray-100 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold text-primary">
                  {curso.name}
                </h2>
                <p className="text-sm text-primary/60 mt-1">
                   {formatearDuración(curso.duration)}  
                </p>
                <div className="flex items-center mt-4">
                  <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full mr-2">
                    CURSO
                  </span>
                  <span className="text-yellow-500 text-sm">
                    ★★★★★
                    {/* {"★".repeat(Math.floor(curso.rating))}
                    {"☆".repeat(5 - Math.floor(curso.rating))} */}
                  </span>
                  <span className="text-gray-600 text-sm ml-2">
                    {/* ({curso.reviews}) */}
                  </span>
                </div>
              </div>
            </div>
           ))} 
        </div>
      </main>
    </>
  );
}
