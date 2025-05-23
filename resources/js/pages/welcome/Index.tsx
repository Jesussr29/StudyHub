import BlurText from '@/components/reactBits/BlurText/BlurText';
import GlitchText from '@/components/reactBits/GlitchText/GlitchText';
import GridDistortion from '@/components/reactBits/GridDistortion/GridDistortion';
import Particles from '@/components/reactBits/Particles/Particles';
import RotatingText from '@/components/reactBits/RotatingText/RotatingText';
import ScrollFloat from '@/components/reactBits/ScrollFloat/ScrollFloat';
import ScrollReveal from '@/components/reactBits/ScrollReveal/ScrollReveal';
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

                        <div className="justify-left flex h-screen w-full items-center">
                            <GridDistortion
                                imageSrc="https://picsum.photos/1920/1080?grayscale"
                                grid={10}
                                mouse={0.1}
                                strength={0.15}
                                relaxation={0.9}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute flex w-[50%] items-center justify-center text-5xl font-bold text-white">
                                <p>Creative Way to </p>&nbsp;
                                <RotatingText
                                    texts={['React', 'Bits', 'Is', 'Cool!']}
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

                        <div>
                            <div>
                                <ScrollFloat
                                    animationDuration={1}
                                    ease="back.inOut(2)"
                                    scrollStart="center bottom+=50%"
                                    scrollEnd="bottom bottom-=40%"
                                    stagger={0.03}
                                >
                                    ¿POR QUÉ USAR STUDYHUB?
                                </ScrollFloat>
                            </div>

                            <div>
                                <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10}>
                                    When does a man die? When he is hit by a bullet? No! When he suffers a disease? No! When he ate a soup made out of
                                    a poisonous mushroom? No! A man dies when he is forgotten!
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
