import BlurText from '@/components/reactBits/BlurText/BlurText';
import GlitchText from '@/components/reactBits/GlitchText/GlitchText';
import GridDistortion from '@/components/reactBits/GridDistortion/GridDistortion';
import Particles from '@/components/reactBits/Particles/Particles';
import RotatingText from '@/components/reactBits/RotatingText/RotatingText';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import './css/welcome.css';

export default function Index() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <main className="bg-[#02040b]">
                <Head title="Página de bienvenida" />
                <div className="fixed top-4 right-4 z-50 flex gap-4">
    <a
        href="/login"
        className="border border-white text-white px-4 py-2 rounded-lg backdrop-blur-md transition duration-300 hover:shadow-[0_0_15px_white] hover:bg-white/10"
    >
        Inicia sesión
    </a>
    <a
        href="/register"
        className="border border-white text-white px-4 py-2 rounded-lg backdrop-blur-md transition duration-300 hover:shadow-[0_0_15px_white] hover:bg-white/10"
    >
        Regístrate
    </a>
</div>

                {loading ? (
                    <div className="animate-color-change flex h-screen flex-col items-center justify-center">
                        <img
                            src="https://res.cloudinary.com/dbw3utkij/image/upload/v1747409087/logocontorno_lbmlyz.png"
                            className="animate-hue-rotate h-30 w-40 opacity-70"
                            alt="Logo"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-start">
                        <div className="relative flex h-screen w-full flex-col items-center justify-center text-center">
                            <div className="absolute inset-0 z-0">
                                <Particles
                                    particleColors={['#ffffff', '#ffffff']}
                                    particleCount={200}
                                    particleSpread={10}
                                    speed={0.2}
                                    particleBaseSize={60}
                                    moveParticlesOnHover={false}
                                    alphaParticles={false}
                                    disableRotation={true}
                                />
                            </div>
                            <div className="z-10">
                                <GlitchText speed={1} enableShadows={true} className="custom-class">
                                    <BlurText text=" StudyHub " delay={250} animateBy="letters" direction="top" className="mb-8" />
                                </GlitchText>
                            </div>
                        </div>

                        <div className="flex h-screen w-full items-center justify-center">
                            <GridDistortion
                                imageSrc="https://picsum.photos/1920/1080?grayscale"
                                grid={10}
                                mouse={0.1}
                                strength={0.15}
                                relaxation={0.9}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute flex items-center justify-center text-5xl font-bold text-white">
                                <p>Una forma creativa de </p>&nbsp;
                                <RotatingText
                                    texts={['Aprender', 'Divertirse']}
                                    mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                                    staggerFrom={'last'}
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '-120%' }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                                    rotationInterval={2000}
                                />
                            </div>
                        </div>

                        <div className="relative w-full overflow-hidden px-6 py-20 text-white">
                            {/* Partículas en el fondo */}
                            <div className="absolute inset-0 z-0">
                                <Particles
                                    particleColors={['#ffffff', '#ffffff']}
                                    particleCount={200}
                                    particleSpread={10}
                                    speed={0.2}
                                    particleBaseSize={60}
                                    moveParticlesOnHover={false}
                                    alphaParticles={false}
                                    disableRotation={true}
                                />
                            </div>

                            {/* Contenido por encima */}
                            <div className="relative z-10">
                                <h2 className="mb-12 text-center text-4xl font-bold">¿Qué es StudyHub?</h2>
                                <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    {/* Card 1 */}
                                    <div className="rounded-2xl bg-[#111827] p-6 shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-cyan-500/30">
                                        <h3 className="mb-3 text-2xl font-semibold text-cyan-400">Aprendizaje Activo</h3>
                                        <p className="text-gray-300">
                                            Apuntate a cursos y realiza los test que quiertas para sacarte el diploma con una manera mas facil y
                                            divertida de aprender.
                                        </p>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="rounded-2xl bg-[#111827] p-6 shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-cyan-500/30">
                                        <h3 className="mb-3 text-2xl font-semibold text-cyan-400">Crea tu cuenta</h3>
                                        <p className="text-gray-300">
                                            Regístrate como <span className="font-medium text-white">estudiante</span> para acceder a cursos
                                            dinámicos, o como <span className="font-medium text-white">profesor</span> para crear y gestionar tus
                                            propios contenidos educativos. ¡Elige tu rol y comienza a explorar!
                                        </p>
                                    </div>

                                    {/* Card 3 */}
                                    <div className="rounded-2xl bg-[#111827] p-6 shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-cyan-500/30">
                                        <h3 className="mb-3 text-2xl font-semibold text-cyan-400">Recursos Personalizados</h3>
                                        <p className="text-gray-300">
                                            Accede a recursos adaptados a tu nivel, ritmo y preferencias. StudyHub te acompaña paso a paso en tu
                                            camino de aprendizaje.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
