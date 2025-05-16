
import GlitchText from '@/components/reactBits/GlitchText/GlitchText';
import GridDistortion from '@/components/reactBits/GridDistortion/GridDistortion';
import Particles from '@/components/reactBits/Particles/Particles';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import './css/welcome.css';
import BlurText from '@/components/reactBits/BlurText/BlurText';

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
                        <div className="relative h-screen w-full flex flex-col items-center justify-center text-center">
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
                                    <BlurText
                                        text=" StudyHub "
                                        delay={250}
                                        animateBy="letters"
                                        direction="top"
                                        className="mb-8"
                                    />
                                </GlitchText>
                            </div>
                        </div>

                        <div className="w-full h-screen">
                            <GridDistortion
                                imageSrc="https://picsum.photos/1920/1080?grayscale"
                                grid={10}
                                mouse={0.1}
                                strength={0.15}
                                relaxation={0.9}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
