// resources/js/Pages/Errors/403.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import { ShieldAlert } from 'lucide-react';

export default function Error403() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Acceso Restringido</h1>
          <p className="text-gray-600 mb-6">
            No tienes los permisos necesarios para acceder a esta sección.
            Si crees que esto es un error, contacta al administrador del sistema.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={route('dashboard')}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Ir al Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
