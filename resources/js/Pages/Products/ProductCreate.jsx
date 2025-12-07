import React, { useState } from 'react';
import {
  Search, Bell, Menu, X, Home,
  Settings, Users, Building2, BarChart3,
  Plus, Upload, Image as ImageIcon, Package,
  Tag, DollarSign, Calendar, Shield,
  Save, X as XIcon, Check
} from 'lucide-react';

import SuperAdminLayout from '@/Layouts/SuperAdminLayout';

const LoadProduct = () => {

    const [previewImages, setPreviewImages] = useState([]);

    const [newTag, setNewTag] = useState('');

    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: [],
        tags: []
    });

    const categories = [
        'Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Libros',
        'Juguetes', 'Belleza', 'Alimentos', 'Mascotas', 'Otros'
    ];

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...newImages]);
        setProductForm(prev => ({
        ...prev,
        images: [...prev.images, ...files]
        }));
    };

    const removeImage = (index) => {
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
        setProductForm(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar al backend
        console.log('Producto a crear:', productForm);
        alert('Producto creado exitosamente!');
        // Reset form
        setProductForm({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: [],
        tags: []
        });
        setPreviewImages([]);
    };

    const addTag = () => {
        if (newTag.trim() && !productForm.tags.includes(newTag.trim())) {
        setProductForm(prev => ({
            ...prev,
            tags: [...prev.tags, newTag.trim()]
        }));
        setNewTag('');
        }
    };


  return (

    <SuperAdminLayout>
        {/* Header */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Nuevo Producto</h1>
        </div>

        {/* Product Form */}
             <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
               <form onSubmit={handleSubmit}>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   {/* Left Column - Basic Info */}
                   <div className="space-y-6">
                     {/* Product Name */}
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Nombre del Producto *
                      </label>
                       <div className="relative">
                         <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          required
                          value={productForm.name}
                          onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                           placeholder="Ingrese el nombre del producto"
                         />
                       </div>
                    </div>

                     {/* Description */}
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                       </label>
                       <textarea
                        required
                        value={productForm.description}
                        onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Describa el producto en detalle..."
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="number"
                          required
                          step="0.01"
                          min="0"
                          value={productForm.price}
                          onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoría *
                      </label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <select
                          required
                          value={productForm.category}
                          onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                        >
                          <option value="">Seleccione una categoría</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Disponible *
                      </label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="number"
                          required
                          min="0"
                          value={productForm.stock}
                          onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Images and Tags */}
                  <div className="space-y-6">
                    {/* Product Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imágenes del Producto
                      </label>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors duration-200 cursor-pointer"
                        onClick={() => document.getElementById('imageUpload').click()}
                      >
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">Haga clic para subir imágenes</p>
                        <p className="text-xs text-gray-500">PNG, JPG hasta 5MB</p>
                        <input
                          id="imageUpload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>

                      {/* Image Preview */}
                      {previewImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {previewImages.map((src, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={src}
                                alt={`preview-${index}`}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              >
                                <XIcon className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Etiquetas
                      </label>
                      <div className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Agregar etiqueta"
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Tag List */}
                      {productForm.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {productForm.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm flex items-center"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-2 text-emerald-600 hover:text-emerald-800"
                              >
                                <XIcon className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Product Preview */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Vista Previa</h3>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                          {previewImages[0] ? (
                            <img src={previewImages[0]} alt="preview" className="h-full object-contain" />
                          ) : (
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          {productForm.name || 'Nombre del producto'}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {productForm.description || 'Descripción del producto...'}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-emerald-600">
                            ${productForm.price || '0.00'}
                          </span>
                          {productForm.stock && (
                            <span className="text-sm text-gray-600">
                              Stock: {productForm.stock}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setProductForm({
                        name: '',
                        description: '',
                        price: '',
                        category: '',
                        stock: '',
                        images: [],
                        tags: []
                      });
                      setPreviewImages([]);
                    }}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center space-x-2"
                  >
                    <Save className="h-5 w-5" />
                    <span>Crear Producto</span>
                  </button>
                </div>
              </form>
            </div>


    </SuperAdminLayout>
  );
};

export default LoadProduct;
