import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import {
  Tag, Grid3X3, Upload, ImageIcon, Save, X as XIcon
} from 'lucide-react';
import { Head } from '@inertiajs/react';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';

const CreateCategory = ({ auth, parentCategories }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const form = useForm({
    name: '',
    slug: '',
    description: '',
    parent_id: '',
    status: 'active',
    meta_title: '',
    meta_description: '',
    images: [],
  });

  // Auto-generar slug desde el nombre
  useEffect(() => {
    if (form.data.name) {
      const slug = form.data.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      form.setData('slug', slug);
    }
  }, [form.data.name]);

  // Función para obtener el nombre limpio de la categoría padre
  const getCleanParentName = () => {
    if (!form.data.parent_id) return '';
    const selected = parentCategories.find(cat => cat.id == form.data.parent_id);
    if (!selected) return '';
    return selected.name.replace('  ↳ ', ''); // Elimina el indicador visual de subcategoría
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      form.setData('images', [file]);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.data.name);
    formData.append('slug', form.data.slug);
    formData.append('description', form.data.description || '');
    formData.append('parent_id', form.data.parent_id || '');
    formData.append('status', form.data.status);
    formData.append('meta_title', form.data.meta_title || '');
    formData.append('meta_description', form.data.meta_description || '');

    if (form.data.images.length > 0) {
      formData.append('images[]', form.data.images[0]);
    }

    form.post(route('categories.store'), {
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
        setPreviewImage(null);
      }
    });
  };

  return (
    <>
      <Head title="Crear Categoría o Subcategoría" />
      <SuperAdminLayout
        user={auth.user}
        header={
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Crear Categoría o Subcategoría
          </h2>
        }
      >
        <div className="py-12">
          <div className="mx-auto sm:px-6 lg:px-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <form onSubmit={submit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Columna izquierda */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre *
                      </label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          required
                          value={form.data.name}
                          onChange={(e) => form.setData('name', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Ej: Muebles, Camas, etc."
                        />
                      </div>
                    </div>

                    {/* Slug solo visual */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug (URL amigable) *
                      </label>
                      <div className="relative">
                        <Grid3X3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <div className="w-full pl-10 pr-4 py-3 text-sm bg-gray-100 border border-gray-300 rounded-xl font-mono text-gray-700 cursor-not-allowed">
                          {/* {form.data.slug || '—'} */}<p className="text-xs text-gray-500 mt-1">
                        URL: <code className="bg-gray-200 px-1 rounded">/categoria/{form.data.slug || 'ejemplo'}</code>
                      </p>
                        </div>
                      </div>
                      {/* <p className="text-xs text-gray-500 mt-1">
                        URL: <code className="bg-gray-200 px-1 rounded">/categorias/{form.data.slug || 'ejemplo'}</code>
                      </p> */}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción
                      </label>
                      <textarea
                        value={form.data.description || ''}
                        onChange={(e) => form.setData('description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    {/* Selector de tipo de categoría */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Categoría
                      </label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <select
                          value={form.data.parent_id}
                          onChange={(e) => form.setData('parent_id', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white font-mono"
                        >
                          {parentCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Mensaje dinámico */}
                      <div className="mt-2 text-sm">
                        {form.data.parent_id ? (
                          <p className="text-blue-600 font-medium flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p>Se creará como subcategoría de <strong>"{getCleanParentName()}"</strong>.</p>
                          </p>
                        ) : (
                          <p className="text-purple-600 font-medium flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>Se creará como <strong>categoría principal.</strong></p>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado
                      </label>
                      <select
                        value={form.data.status}
                        onChange={(e) => form.setData('status', e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="active">Activa</option>
                        <option value="inactive">Inactiva</option>
                        <option value="draft">Borrador</option>
                      </select>
                    </div>
                  </div>

                  {/* Columna derecha */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imagen Principal
                      </label>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 cursor-pointer"
                        onClick={() => document.getElementById('imageUpload').click()}
                      >
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Subir imagen</p>
                        <input
                          id="imageUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>

                      {previewImage && (
                        <div className="mt-4 flex justify-center">
                          <div className="relative group">
                            <img
                              src={previewImage}
                              alt="Vista previa"
                              className="w-32 h-32 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewImage(null);
                                form.setData('images', []);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                            >
                              <XIcon className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Vista previa mejorada */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Vista Previa</h3>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="w-full h-24 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                          {previewImage ? (
                            <img src={previewImage} alt="preview" className="h-full object-contain" />
                          ) : (
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{form.data.name || 'Nombre...'}</h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {form.data.description || 'Descripción...'}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            form.data.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : form.data.status === 'inactive'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {form.data.status === 'active' ? 'Activa' :
                             form.data.status === 'inactive' ? 'Inactiva' : 'Borrador'}
                          </span>

                          {form.data.parent_id ? (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                              Subcategoría de: <strong>{getCleanParentName()}</strong>
                            </span>
                          ) : (
                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                              Categoría principal
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 mt-2">
                          URL: <code className="bg-gray-200 px-1 rounded">/categoria/{form.data.slug || 'ejemplo'}</code>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      form.reset();
                      setPreviewImage(null);
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={form.processing}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save className="h-5 w-5" />
                    <span>Crear Categoría</span>
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

export default CreateCategory;
