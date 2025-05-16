import React from 'react'
import { Head } from '@inertiajs/react'

export default function Index() {
  return (
    <>
      <Head title="Bienvenido personalizado" />
      <div className="bg-blue-500">
        <h1 className="text-3xl font-bold">¡Bienvenido a la página personalizada!</h1>
        <p className="text-gray-600 mt-4">Esta es una vista en React con TypeScript.</p>
      </div>
    </>
  )
}
