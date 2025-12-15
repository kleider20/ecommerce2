// resources/js/Pages/Roles/RolesCreate.jsx
import React, { useState } from 'react';
import {
  ArrowLeft, Shield, Key, Globe, Users, Lock, Package,
  Building2, User, Crown, Bike, Truck
} from 'lucide-react';
import { Head, Link, router } from '@inertiajs/react';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';

const iconOptions = [
  { value: 'Shield', label: 'Escudo', icon: Shield },
  { value: 'Users', label: 'Usuarios', icon: Users },
  { value: 'Key', label: 'Llave', icon: Key },
  { value: 'Globe', label: 'Globo', icon: Globe },
  { value: 'Package', label: 'Paquete', icon: Package },
  { value: 'Building2', label: 'Edificio', icon: Building2 },
  { value: 'User', label: 'Usuario', icon: User },
  { value: 'Crown', label: 'Corona', icon: Crown },
  { value: 'Bike', label: 'Bicicleta', icon: Bike },
  {value: 'Truck', label: 'Camion', icon: Truck},
];

const colorOptions = [
  { value: 'bg-blue-100 text-blue-800', label: 'Azul' },
  { value: 'bg-green-100 text-green-800', label: 'Verde' },
  { value: 'bg-red-100 text-red-800', label: 'Rojo' },
  { value: 'bg-purple-100 text-purple-800', label: 'Púrpura' },
  { value: 'bg-indigo-100 text-indigo-800', label: 'Índigo' },
  { value: 'bg-yellow-100 text-yellow-800', label: 'Amarillo' },
  { value: 'bg-pink-100 text-pink-800', label: 'Rosa' },
  { value: 'bg-gray-100 text-gray-800', label: 'Gris' },
];

const RolesCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    display_name: '',
    description: '',
    color: 'bg-blue-100 text-blue-800',
    icon: 'Shield',
    show_in_register: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route('roles.store'), formData, {
      onSuccess: () => {
        // Inertia redirigirá automáticamente a roles.index si el controlador lo hace
      },
      onError: (err) => setErrors(err)
    });
  };

  return (
    <>
    <SuperAdminLayout>
      <Head title="Crear Nuevo Rol" />

      <div className="min-h-screen bg-gray-50">
        {/* Contenido principal centrado */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ✅ TODO dentro de una sola tarjeta */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
            {/* Header dentro de la tarjeta */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center">
                <Link
                  href={route('roles.index')}
                  className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Volver a roles"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">Crear Nuevo Rol</h1>
                  <p className="text-sm text-gray-500">
                    Define un nuevo rol con permisos y características personalizadas
                  </p>
                </div>
              </div>
            </div>

            {/* Formulario dentro de la tarjeta */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Columna izquierda: Información básica */}
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
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.name ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="ej: editor, moderator"
                        required
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    <p className="mt-1 text-xs text-gray-500">
                      Nombre interno (solo letras y guiones bajos)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre para mostrar <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Shield className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="display_name"
                        value={formData.display_name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.display_name ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="ej: Editor de Contenido"
                        required
                      />
                    </div>
                    {errors.display_name && <p className="mt-1 text-sm text-red-600">{errors.display_name}</p>}
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
                      placeholder="Describe las responsabilidades..."
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                  </div>

                  <div className="flex items-center">
                    <input
                      id="show_in_register"
                      name="show_in_register"
                      type="checkbox"
                      checked={formData.show_in_register}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="show_in_register" className="ml-2 text-sm font-medium text-gray-700">
                      Mostrar en formulario de registro
                    </label>
                  </div>
                </div>

                {/* Columna derecha: Personalización */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Color del rol
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.color === color.value
                              ? 'border-blue-500 ring-2 ring-blue-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-full h-8 ${color.value.split(' ')[0]}`}></div>
                        </button>
                      ))}
                    </div>
                    {errors.color && <p className="mt-2 text-sm text-red-600">{errors.color}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Icono del rol
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {iconOptions.map((iconOption) => {
                        const IconComponent = iconOption.icon;
                        return (
                          <button
                            key={iconOption.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, icon: iconOption.value }))}
                            className={`p-3 rounded-lg border-2 flex flex-col items-center transition-all ${
                              formData.icon === iconOption.value
                                ? 'border-blue-500 ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <IconComponent className="w-6 h-6" />
                            <span className="text-xs mt-1">{iconOption.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.icon && <p className="mt-2 text-sm text-red-600">{errors.icon}</p>}
                  </div>

                  {/* Preview dentro de la tarjeta */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-3">Vista previa</h3>
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.color}`}>
                        {React.createElement(
                          iconOptions.find(i => i.value === formData.icon)?.icon || Shield,
                          { className: "w-5 h-5" }
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {formData.display_name || 'Nombre del rol'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formData.description || 'Descripción del rol'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones dentro de la tarjeta */}
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
                  <Shield className="w-4 h-4 mr-2" />
                  Crear Rol
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </SuperAdminLayout>
    </>
  );
};

export default RolesCreate;
