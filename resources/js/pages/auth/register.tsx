import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import ShinyText from '@/components/reactBits/ShinyText/ShinyText';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex h-screen">

            <div className="hidden h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#1E1E2F] to-[#1E1E2F] lg:flex">
                <img
                    src="https://res.cloudinary.com/dbw3utkij/image/upload/v1747407262/fondo-login_i1jif1.jpg"
                    alt="Logo"
                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                />
            </div>

            <div className="flex h-screen w-full flex-col items-center justify-center bg-[#02040b] lg:w-1/2">

                <div className="height-screen flex w-full flex-col items-center justify-center"></div>

                    <AuthLayout title="Registrate en StudyHub" description="Ingrese sus datos para crear su cuenta">
                        <Head title="Register" />
                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2 text-primary/60">
                                    <Label htmlFor="name"><ShinyText text="Nombre" disabled={false} speed={3} className='custom-class' /></Label>
                                    <Input
                                        id="name"
                                        type="text" 
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Nombre completo"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="grid gap-2 text-primary/60">
                                    <Label htmlFor="email"><ShinyText text="Correo electronico" disabled={false} speed={3} className='custom-class' /></Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2 text-primary/60">
                                    <Label htmlFor="password"><ShinyText text="Contraseña" disabled={false} speed={3} className='custom-class' /></Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        disabled={processing}
                                        placeholder="Contraseña"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2 text-primary/60">
                                    <Label htmlFor="password_confirmation"><ShinyText text="Confirmar contraseña" disabled={false} speed={3} className='custom-class' /></Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        placeholder="Confirmar contraseña"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Crear cuenta
                                </Button>
                            </div>

                            <div className="text-muted-foreground text-center text-sm">
                                ¿Ya tienes una cuenta?{' '}
                                <TextLink href={route('login')} tabIndex={6}>
                                    Iniciar sesión
                                </TextLink>
                            </div>
                        </form>
                    </AuthLayout>
            </div>

        </div>
    );
}
