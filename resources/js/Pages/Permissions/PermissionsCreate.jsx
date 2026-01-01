// resources/js/Pages/Permissions/PermissionsCreate.jsx
import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Key, Lock, Globe } from 'lucide-react';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';

const PermissionsCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    display_name: '',
    description: '',
    is_critical: false,
    category: 'general'
  });

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'users', label: 'Usuarios' },
    { value: 'products', label: 'Productos' },
    { value: 'orders', label: 'Pedidos' },
    { value: 'settings', label: 'Configuración' },
    { value: 'system', label: 'Sistema' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

 const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route('permissions.store'), formData, {
      onSuccess: () => {
        // Redirección automática si el controlador usa to_route()
      },
      onError: (errors) => {
        console.error('Errores de validación:', errors);
      }
    });
  };

  return (
    <>
    <SuperAdminLayout>
      <Head title="Crear Nuevo Permiso" />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-5">
            <div className="flex items-center">
              <Link
                href={route('roles.index')}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Volver a roles"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">Crear Nuevo Permiso</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Define un nuevo permiso para el sistema de roles y accesos
                </p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Columna izquierda */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre técnico <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Key className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="ej: edit_products"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Nombre interno (solo letras, números y guiones bajos)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre para mostrar <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="display_name"
                      value={formData.display_name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="ej: Editar Productos"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe qué permite este permiso..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="is_critical"
                    name="is_critical"
                    type="checkbox"
                    checked={formData.is_critical}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="is_critical" className="ml-2 text-sm font-medium text-gray-700">
                    Permiso crítico
                  </label>
                  <div className="ml-2 group relative">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">?</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 shadow-lg whitespace-nowrap">
                        No se puede eliminar si está asignado
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna derecha */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Categoría
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.category === category.value
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`w-full h-8 ${category.value === 'system' ? 'bg-red-100' : category.value === 'users' ? 'bg-green-100' : 'bg-gray-100'} rounded mb-2`}></div>
                          <span className="text-xs font-medium text-gray-700">{category.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vista previa */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Vista previa</h3>
                  <div className="p-4 bg-white rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Lock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {formData.display_name || 'Nombre del permiso'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formData.description || 'Descripción del permiso'}
                        </p>
                      </div>
                    </div>
                    {formData.is_critical && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-3">
                        <Lock className="w-3 h-3 mr-1" /> Crítico
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-200">
              <Link
                href={route('roles.index')}
                className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center"
              >
                <Lock className="w-4 h-4 mr-2" />
                Crear Permiso
              </button>
            </div>
          </form>
        </div>
      </div>
      </SuperAdminLayout>
    </>
  );
};

export default PermissionsCreate;
