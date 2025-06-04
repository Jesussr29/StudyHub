import AppearanceTabs from '@/components/appearance-tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuDesplegable from '@/layouts/app/inicio-header-layout';
import { useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import { BookMarked, BookOpenCheck, CalendarDays, Mail, Phone, Settings, ShieldCheck, User2, UserCircle2, UserPlus } from 'lucide-react';

import InputError from '@/components/input-error';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    user: any;
    stadistics: any[];
    enrollments: any[];
}

export default function ProfileIndex({ user, stadistics, enrollments }: Props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [cursoSeleccionado, setCursoSeleccionado] = useState<any>(null);

    const cursosEnProceso = enrollments.filter((e) => e.completion_date === null);
    const cursosCompletados = enrollments.filter((e) => e.completion_date !== null);

    const [animationActive, setAnimationActive] = useState(true);

    const [chartKey, setChartKey] = useState(0);

    const abrirDialogo = (curso: any) => {
        setCursoSeleccionado(curso);
        setDialogOpen(true);
        setAnimationActive(false);
        setTimeout(() => {
            setAnimationActive(true);
        }, 1);
    };

    const estadisticasCurso = (() => {
        if (!cursoSeleccionado) return [];

        const inscripcion = enrollments.find((s) => s.course.id === cursoSeleccionado.id);
        if (!inscripcion) return [];

        const testIds = cursoSeleccionado.tests?.map((test: any) => test.id) ?? [];

        return stadistics.filter((stat) => stat.student_id === inscripcion.id && testIds.includes(stat.test_id));
    })();

    const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#FF6384', '#36A2EB'];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="max-w-xs rounded-lg border border-gray-300 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                    <p className="truncate text-lg font-bold text-gray-900 dark:text-white">{data.test_name}</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <p>
                            <strong>Total preguntas:</strong> {data.total_questions}
                        </p>
                        <p>
                            <strong>Correctas:</strong> {data.correct_answers}
                        </p>
                        <p>
                            <strong>Estado:</strong> {data.status}
                        </p>
                        <p>
                            <strong>Completado:</strong> {data.completed_at ? new Date(data.completed_at).toLocaleString() : 'No'}
                        </p>
                        <p>
                            <strong>Precisión:</strong>{' '}
                            {data.total_questions > 0 ? `${((data.correct_answers / data.total_questions) * 100).toFixed(1)}%` : '0.0%'}
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 transition-colors duration-300 dark:bg-[#02040b] dark:text-gray-100">
            <MenuDesplegable user={user} />

            <section className="mx-auto max-w-7xl px-6 pt-8 pb-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-nowrap items-center gap-4">
                        <User2 className="h-10 w-10 flex-shrink-0 text-blue-600 sm:h-12 sm:w-12 dark:text-blue-400" />
                        <div className="min-w-0">
                            <h1 className="max-w-xs truncate text-base font-extrabold tracking-tight sm:max-w-none sm:text-3xl md:text-4xl">
                                {user.name}
                            </h1>
                            <p className="mt-1 flex max-w-xs items-center gap-2 truncate text-xs text-gray-700 sm:max-w-none sm:text-lg dark:text-gray-300">
                                <Mail className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5 dark:text-blue-400" />
                                {user.email}
                            </p>
                        </div>
                    </div>
                    <div className="max-w-full overflow-hidden text-xs overflow-ellipsis whitespace-nowrap text-gray-500 italic sm:text-sm dark:text-gray-400">
                        Última actualización: {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-7xl px-8 pb-16">
                <Tabs defaultValue="cursos" className="w-full">
                    <TabsList className="mb-6 flex w-full max-w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white p-1 shadow-md dark:border-gray-700 dark:bg-[#0d1117]">
                        {[
                            { value: 'cursos', icon: BookMarked, label: 'Mis Cursos' },
                            { value: 'datos', icon: UserCircle2, label: 'Mis Datos' },
                            { value: 'configuracion', icon: Settings, label: 'Configuración' },
                        ].map(({ value, icon: Icon, label }) => (
                            <TabsTrigger
                                key={value}
                                value={value}
                                className="group relative mx-0.5 flex min-w-[70px] flex-shrink-0 items-center justify-center gap-1 rounded-xl px-2 py-2 text-[clamp(0.65rem,1vw,0.85rem)] font-semibold whitespace-nowrap text-gray-600 transition-all duration-300 hover:bg-blue-100 hover:text-blue-600 data-[state=active]:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 dark:data-[state=active]:text-blue-400"
                            >
                                <Icon className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 md:h-5 md:w-5" />
                                <span className="max-w-[80px] truncate md:max-w-[120px]">{label}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Cursos */}
                    <TabsContent value="cursos" className="space-y-12">
                        <section className="px-4 sm:px-6 lg:px-8">
                            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-yellow-700 sm:gap-3 sm:text-xl md:text-2xl dark:text-yellow-400">
                                <BookOpenCheck className="h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                                Cursos en proceso
                            </h2>
                            {cursosEnProceso.length === 0 ? (
                                <p className="text-sm text-gray-500 sm:text-base dark:text-gray-400">No tienes cursos en proceso.</p>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                                    {cursosEnProceso.map((inscripcion) => {
                                        const curso = inscripcion.course;
                                        if (!curso) return null;
                                        return (
                                            <div
                                                key={inscripcion.id}
                                                onClick={() => abrirDialogo(curso)}
                                                className="relative flex h-48 cursor-pointer items-end overflow-hidden rounded-xl bg-gray-900 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl sm:h-56 md:h-64"
                                                style={{
                                                    backgroundImage: `url(${curso.image || '/placeholder.jpg'})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-black/50" />
                                                <div className="relative z-10 w-full p-4 text-white sm:p-6">
                                                    <h3 className="mb-1 line-clamp-2 text-base font-bold sm:text-lg md:text-xl">
                                                        {curso.name || curso.title}
                                                    </h3>
                                                    <p className="text-xs font-semibold text-yellow-300 sm:text-sm">En proceso</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </section>

                        <section className="mt-12 px-4 sm:px-6 lg:px-8">
                            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-green-700 sm:gap-3 sm:text-xl md:text-2xl dark:text-green-400">
                                <ShieldCheck className="h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                                Cursos completados
                            </h2>
                            {cursosCompletados.length === 0 ? (
                                <p className="text-sm text-gray-500 sm:text-base dark:text-gray-400">No tienes cursos terminados.</p>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                                    {cursosCompletados.map((inscripcion) => {
                                        const curso = inscripcion.course;
                                        if (!curso) return null;
                                        return (
                                            <div
                                                key={inscripcion.id}
                                                onClick={() => abrirDialogo(curso)}
                                                className="relative flex h-48 cursor-pointer items-end overflow-hidden rounded-xl bg-gray-900 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl sm:h-56 md:h-64"
                                                style={{
                                                    backgroundImage: `url(${curso.image || '/placeholder.jpg'})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-black/50" />
                                                <div className="relative z-10 w-full p-4 text-white sm:p-6">
                                                    <h3 className="mb-1 line-clamp-2 text-base font-bold sm:text-lg md:text-xl">
                                                        {curso.name || curso.title}
                                                    </h3>
                                                    <p className="text-xs font-semibold text-green-500 sm:text-sm">Completado</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    </TabsContent>

                    {/* Datos */}
                    <TabsContent value="datos">
                        <section className="grid grid-cols-1 gap-8 px-4 py-6 sm:px-6 md:grid-cols-2 md:gap-10 lg:px-8">
                            {/* Perfil Personal */}
                            <div className="space-y-5 rounded-lg bg-gray-100 p-6 shadow-lg sm:p-8 dark:bg-gray-800">
                                <h2 className="flex items-center gap-2 text-2xl font-semibold text-blue-700 sm:text-3xl dark:text-blue-400">
                                    <UserCircle2 className="h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8" />
                                    <span>Perfil Personal</span>
                                </h2>

                                <div className="space-y-3 text-sm sm:text-base">
                                    <div>
                                        <strong className="text-blue-600 dark:text-blue-400">Nombre completo:</strong> {user.name}
                                    </div>
                                    <div>
                                        <strong className="text-blue-600 dark:text-blue-400">Correo electrónico:</strong> {user.email}
                                    </div>
                                    {user.username && (
                                        <div>
                                            <strong className="text-blue-600 dark:text-blue-400">Usuario:</strong> {user.username}
                                        </div>
                                    )}
                                    {user.phone && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 flex-shrink-0 text-blue-500 sm:h-5 sm:w-5 dark:text-blue-400" />
                                            <span>
                                                <strong className="text-blue-600 dark:text-blue-400">Teléfono:</strong> {user.phone}
                                            </span>
                                        </div>
                                    )}
                                    {user.created_at && (
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 flex-shrink-0 text-blue-500 sm:h-5 sm:w-5 dark:text-blue-400" />
                                            <span>
                                                <strong className="text-blue-600 dark:text-blue-400">Miembro desde:</strong>{' '}
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    )}
                                    {user.role && (
                                        <div>
                                            <strong className="text-blue-600 dark:text-blue-400">Rol:</strong> {user.role}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Información adicional */}
                            <div className="space-y-5 rounded-lg bg-gray-100 p-6 shadow-lg sm:p-8 dark:bg-gray-800">
                                <h2 className="flex items-center gap-2 text-2xl font-semibold text-indigo-700 sm:text-3xl dark:text-indigo-400">
                                    <UserPlus className="h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8" />
                                    <span>Información adicional</span>
                                </h2>

                                <p className="text-xs text-gray-700 sm:text-sm dark:text-gray-300">
                                    Aquí puedes agregar más información relevante sobre el usuario, como:
                                </p>
                                <ul className="list-inside list-disc space-y-1 text-xs text-gray-800 sm:space-y-2 sm:text-sm dark:text-gray-300">
                                    <li>Preferencias de notificación</li>
                                    <li>Historial de actividad</li>
                                    <li>Última sesión iniciada</li>
                                    <li>Otras configuraciones personales</li>
                                </ul>
                            </div>
                        </section>
                    </TabsContent>

                    {/* Configuración */}
                    <TabsContent value="configuracion">
                        <section className="mx-auto max-w-3xl space-y-8 py-6">
                            <h2 className="flex items-center gap-3 text-xl font-semibold text-indigo-700 sm:text-2xl md:text-3xl dark:text-indigo-400">
                                <Settings className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                                Configuración de la cuenta
                            </h2>

                            <div className="space-y-6 rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800">
                                <HeadingSmall title="Apariencia" description="Personaliza la apariencia de la aplicación" />
                                <AppearanceTabs />
                            </div>

                            <div className="space-y-4 rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800">
                                <div className="space-y-6">
                                    <HeadingSmall
                                        title="Update password"
                                        description="Ensure your account is using a long, random password to stay secure"
                                    />

                                    <form onSubmit={updatePassword} className="space-y-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="current_password">Current password</Label>

                                            <Input
                                                id="current_password"
                                                ref={currentPasswordInput}
                                                value={data.current_password}
                                                onChange={(e) => setData('current_password', e.target.value)}
                                                type="password"
                                                className="mt-1 block w-full"
                                                autoComplete="current-password"
                                                placeholder="Current password"
                                            />

                                            <InputError message={errors.current_password} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password">New password</Label>

                                            <Input
                                                id="password"
                                                ref={passwordInput}
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                type="password"
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                                placeholder="New password"
                                            />

                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password_confirmation">Confirm password</Label>

                                            <Input
                                                id="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                type="password"
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                                placeholder="Confirm password"
                                            />

                                            <InputError message={errors.password_confirmation} />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <Button disabled={processing} className="">
                                                Save password
                                            </Button>

                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-neutral-600">Saved</p>
                                            </Transition>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    </TabsContent>
                </Tabs>
            </main>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="flex max-h-[90vh] flex-col items-center overflow-y-auto rounded-xl bg-gradient-to-tr from-white/80 to-blue-50 p-6 shadow-2xl sm:mx-auto sm:max-w-4xl sm:p-8 dark:from-[#0a142a] dark:to-[#121b34]">
                    <DialogHeader className="mb-6 w-full text-center">
                        <DialogTitle className="text-3xl font-extrabold text-blue-700 dark:text-blue-400">
                            {cursoSeleccionado?.name || cursoSeleccionado?.title}
                        </DialogTitle>
                        <DialogDescription className="mt-1 text-gray-600 dark:text-gray-400">Distribución de preguntas por test</DialogDescription>
                    </DialogHeader>

                    {estadisticasCurso.length > 0 ? (
                        <div className="w-full max-w-xl">
                            <ResponsiveContainer width="100%" height={350}>
                                <PieChart key={chartKey}>
                                    <Pie
                                        data={estadisticasCurso}
                                        dataKey="total_questions"
                                        nameKey="test_name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        innerRadius={60}
                                        paddingAngle={4}
                                        isAnimationActive={animationActive}
                                        animationDuration={800}
                                        animationEasing="ease-out"
                                        labelLine={false}
                                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                    >
                                        {estadisticasCurso.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip content={<CustomTooltip />} />
                                    <Legend
                                        iconType="circle"
                                        layout="horizontal"
                                        verticalAlign="bottom"
                                        align="center"
                                        wrapperStyle={{
                                            paddingTop: 20,
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            color: 'var(--text-color)',
                                            maxWidth: '100%',
                                            flexWrap: 'wrap',
                                            justifyContent: 'center',
                                            display: 'flex',
                                            gap: 12,
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="mt-4 font-semibold text-red-500">No hay estadísticas disponibles para este curso.</p>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
