import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
  rol: string;
}

export default function CreateUser({ rol }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rol: rol,
    description: '',
    isBanned: false,
  });

  const [imagePreview, setImagePreview] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setImagePreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('rol', formData.rol);
    data.append('description', formData.description);
    data.append('isBanned', formData.isBanned ? '1' : '0');

    if (file) {
      data.append('image', file);
    }

    router.post('/admin/storeUser', data, {
      preserveScroll: true,
    });
  };

  return (
    <section className="mx-auto mt-10 max-w-3xl rounded-xl bg-gray-100 p-8 shadow-lg dark:bg-[#101828]">
      <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        ➕ Crear {rol === 'student' ? 'Estudiante' : 'Profesor'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 rounded-lg border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-purple-500 dark:bg-[#1E293B] dark:text-white"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 rounded-lg border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-purple-500 dark:bg-[#1E293B] dark:text-white"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 rounded-lg border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-purple-500 dark:bg-[#1E293B] dark:text-white"
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full mt-1 rounded-lg border border-gray-300 p-3 text-gray-900 focus:ring-2 focus:ring-purple-500 dark:bg-[#1E293B] dark:text-white"
          />
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Foto de perfil</label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Vista previa"
              className="h-24 w-24 rounded-full object-cover shadow mb-3"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full rounded-lg border border-gray-300 bg-white p-2 dark:bg-[#1E293B] dark:text-white"
          />
        </div>

        {/* ¿Baneado? */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isBanned"
            checked={formData.isBanned}
            onChange={handleChange}
            className="h-5 w-5 accent-red-600"
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">¿Está baneado?</label>
        </div>

        {/* Botón */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition hover:bg-purple-700"
          >
            Crear {rol === 'student' ? 'Estudiante' : 'Profesor'}
          </button>
        </div>
      </form>
    </section>
  );
}
