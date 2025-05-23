import ShinyText from '@/components/reactBits/ShinyText/ShinyText';
import MenuDesplegable from '@/layouts/app/inicio-header-layout';
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useState, useEffect } from 'react';

export default function Home() {

useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false,
  });

  const handleScroll = () => {
    AOS.refresh();
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);


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

                {/* card */}
                <div className="mt-7 flex h-[400px] w-[78%] items-center justify-center rounded-lg bg-[#2b3039] shadow-lg" >
                    {/* card content */}
                    <div className="flex h-[80%] w-[90%] rounded-lg">
                        <h3 className="text-5xl">¿Que deseas aprender?</h3>
                        <p className="mt-2 text-center">Elige entre una variedad de cursos y empieza a aprender hoy mismo.</p>
                    </div>
                </div>

            </div>
        </>
    );
}
