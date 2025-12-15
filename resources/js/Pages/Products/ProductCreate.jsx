// import React, { useState } from 'react';
// import {
//   Search, Bell, Menu, X, Home,
//   Settings, Users, Building2, BarChart3,
//   Plus, Upload, Image as ImageIcon, Package,
//   Tag, DollarSign, Calendar, Shield,
//   Save, X as XIcon, Check
// } from 'lucide-react';

// import SuperAdminLayout from '@/Layouts/SuperAdminLayout';

// const LoadProduct = () => {

//     const [previewImages, setPreviewImages] = useState([]);

//     const [newTag, setNewTag] = useState('');

//     const [productForm, setProductForm] = useState({
//         name: '',
//         description: '',
//         price: '',
//         category: '',
//         stock: '',
//         images: [],
//         tags: []
//     });

//     const categories = [
//         'Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Libros',
//         'Juguetes', 'Belleza', 'Alimentos', 'Mascotas', 'Otros'
//     ];

//     const handleImageUpload = (e) => {
//         const files = Array.from(e.target.files);
//         const newImages = files.map(file => URL.createObjectURL(file));
//         setPreviewImages(prev => [...prev, ...newImages]);
//         setProductForm(prev => ({
//         ...prev,
//         images: [...prev.images, ...files]
//         }));
//     };

//     const removeImage = (index) => {
//         setPreviewImages(prev => prev.filter((_, i) => i !== index));
//         setProductForm(prev => ({
//         ...prev,
//         images: prev.images.filter((_, i) => i !== index)
//         }));
//     };


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Aquí iría la lógica para enviar al backend
//         console.log('Producto a crear:', productForm);
//         alert('Producto creado exitosamente!');
//         // Reset form
//         setProductForm({
//         name: '',
//         description: '',
//         price: '',
//         category: '',
//         stock: '',
//         images: [],
//         tags: []
//         });
//         setPreviewImages([]);
//     };

//     const addTag = () => {
//         if (newTag.trim() && !productForm.tags.includes(newTag.trim())) {
//         setProductForm(prev => ({
//             ...prev,
//             tags: [...prev.tags, newTag.trim()]
//         }));
//         setNewTag('');
//         }
//     };


//   return (

//     <SuperAdminLayout>
//         {/* Header */}
//         <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Nuevo Producto</h1>
//         </div>

//         {/* Product Form */}
//              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
//                <form onSubmit={handleSubmit}>
//                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                    {/* Left Column - Basic Info */}
//                    <div className="space-y-6">
//                      {/* Product Name */}
//                      <div>
//                        <label className="block text-sm font-medium text-gray-700 mb-2">
//                          Nombre del Producto *
//                       </label>
//                        <div className="relative">
//                          <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                         <input
//                           type="text"
//                           required
//                           value={productForm.name}
//                           onChange={(e) => setProductForm({...productForm, name: e.target.value})}
//                           className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                            placeholder="Ingrese el nombre del producto"
//                          />
//                        </div>
//                     </div>

//                      {/* Description */}
//                      <div>
//                        <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Descripción *
//                        </label>
//                        <textarea
//                         required
//                         value={productForm.description}
//                         onChange={(e) => setProductForm({...productForm, description: e.target.value})}
//                         rows={4}
//                         className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                         placeholder="Describa el producto en detalle..."
//                       />
//                     </div>

//                     {/* Price */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Precio *
//                       </label>
//                       <div className="relative">
//                         <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                         <input
//                           type="number"
//                           required
//                           step="0.01"
//                           min="0"
//                           value={productForm.price}
//                           onChange={(e) => setProductForm({...productForm, price: e.target.value})}
//                           className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                           placeholder="0.00"
//                         />
//                       </div>
//                     </div>

//                     {/* Category */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Categoría *
//                       </label>
//                       <div className="relative">
//                         <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                         <select
//                           required
//                           value={productForm.category}
//                           onChange={(e) => setProductForm({...productForm, category: e.target.value})}
//                           className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
//                         >
//                           <option value="">Seleccione una categoría</option>
//                           {categories.map((category) => (
//                             <option key={category} value={category}>{category}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     {/* Stock */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Stock Disponible *
//                       </label>
//                       <div className="relative">
//                         <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                         <input
//                           type="number"
//                           required
//                           min="0"
//                           value={productForm.stock}
//                           onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
//                           className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                           placeholder="0"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Column - Images and Tags */}
//                   <div className="space-y-6">
//                     {/* Product Images */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Imágenes del Producto
//                       </label>
//                       <div
//                         className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors duration-200 cursor-pointer"
//                         onClick={() => document.getElementById('imageUpload').click()}
//                       >
//                         <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//                         <p className="text-sm text-gray-600 mb-1">Haga clic para subir imágenes</p>
//                         <p className="text-xs text-gray-500">PNG, JPG hasta 5MB</p>
//                         <input
//                           id="imageUpload"
//                           type="file"
//                           multiple
//                           accept="image/*"
//                           onChange={handleImageUpload}
//                           className="hidden"
//                         />
//                       </div>

//                       {/* Image Preview */}
//                       {previewImages.length > 0 && (
//                         <div className="mt-4 grid grid-cols-3 gap-2">
//                           {previewImages.map((src, index) => (
//                             <div key={index} className="relative group">
//                               <img
//                                 src={src}
//                                 alt={`preview-${index}`}
//                                 className="w-full h-20 object-cover rounded-lg"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => removeImage(index)}
//                                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                               >
//                                 <XIcon className="h-3 w-3" />
//                               </button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>

//                     {/* Tags */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Etiquetas
//                       </label>
//                       <div className="flex space-x-2 mb-2">
//                         <input
//                           type="text"
//                           value={newTag}
//                           onChange={(e) => setNewTag(e.target.value)}
//                           onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
//                           className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                           placeholder="Agregar etiqueta"
//                         />
//                         <button
//                           type="button"
//                           onClick={addTag}
//                           className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
//                         >
//                           <Plus className="h-4 w-4" />
//                         </button>
//                       </div>

//                       {/* Tag List */}
//                       {productForm.tags.length > 0 && (
//                         <div className="flex flex-wrap gap-2">
//                           {productForm.tags.map((tag, index) => (
//                             <span
//                               key={index}
//                               className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm flex items-center"
//                             >
//                               {tag}
//                               <button
//                                 type="button"
//                                 onClick={() => removeTag(tag)}
//                                 className="ml-2 text-emerald-600 hover:text-emerald-800"
//                               >
//                                 <XIcon className="h-3 w-3" />
//                               </button>
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                     </div>

//                     {/* Product Preview */}
//                     <div className="bg-gray-50 rounded-xl p-4">
//                       <h3 className="font-medium text-gray-900 mb-3">Vista Previa</h3>
//                       <div className="border border-gray-200 rounded-lg p-4">
//                         <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
//                           {previewImages[0] ? (
//                             <img src={previewImages[0]} alt="preview" className="h-full object-contain" />
//                           ) : (
//                             <ImageIcon className="h-8 w-8 text-gray-400" />
//                           )}
//                         </div>
//                         <h4 className="font-medium text-gray-900 mb-1">
//                           {productForm.name || 'Nombre del producto'}
//                         </h4>
//                         <p className="text-sm text-gray-600 mb-2 line-clamp-2">
//                           {productForm.description || 'Descripción del producto...'}
//                         </p>
//                         <div className="flex items-center justify-between">
//                           <span className="text-lg font-bold text-emerald-600">
//                             ${productForm.price || '0.00'}
//                           </span>
//                           {productForm.stock && (
//                             <span className="text-sm text-gray-600">
//                               Stock: {productForm.stock}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Form Actions */}
//                 <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setProductForm({
//                         name: '',
//                         description: '',
//                         price: '',
//                         category: '',
//                         stock: '',
//                         images: [],
//                         tags: []
//                       });
//                       setPreviewImages([]);
//                     }}
//                     className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
//                   >
//                     Cancelar
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center space-x-2"
//                   >
//                     <Save className="h-5 w-5" />
//                     <span>Crear Producto</span>
//                   </button>
//                 </div>
//               </form>
//             </div>


//     </SuperAdminLayout>
//   );
// };

// export default LoadProduct;



// resources/js/Pages/SuperAdmin/Products/ProductCreate.jsx
import React, { useState } from 'react';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import ProductCard from '@/Components/Custom/ProductCard';
import MultiImageUploader from '@/Components/Custom/MultiImageUploader'; // 👈 Componente para múltiples imágenes
import {
  Package as PackageIcon,
  ShoppingCart,
  Award,
  Tag,
  Image as ImageIcon,
  CheckCircle
} from 'lucide-react';

const ProductCreate = ({ categories, userConfig }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    price_usd: '',
    original_price_usd: '',
    stock: 0,
    in_stock: false,
    is_active: true,
    brand: '',
    is_bestseller: false,
    is_new: false,
    rating: 0,
    review_count: 0,
    free_shipping: false,
    warranty: '',
    price_per_unit: '',
    sku: '',
    short_description: '',
    // 👇 Nuevos campos para imágenes
    main_image: null,       // Archivo de la imagen principal
    gallery_images: []      // Array de archivos para la galería
  });

  const [localPreview, setLocalPreview] = useState(null); // Vista previa de la imagen principal
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 👇 Maneja la selección de la imagen principal
  const handleMainImageSelect = (file) => {
    setFormData(prev => ({ ...prev, main_image: file }));
    // Vista previa local
    const reader = new FileReader();
    reader.onload = () => setLocalPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // 👇 Maneja la selección de la galería
  const handleGalleryImagesSelect = (files) => {
    setFormData(prev => ({ ...prev, gallery_images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();

    // Agregar campos de texto
    Object.keys(formData).forEach(key => {
      if (key !== 'main_image' && key !== 'gallery_images') {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Agregar imágenes
    if (formData.main_image) {
      formDataToSend.append('main_image', formData.main_image);
    }
    formData.gallery_images.forEach(file => {
      formDataToSend.append('gallery_images[]', file);
    });

    try {
      const response = await fetch(route('products.store'), {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        }
      });

      if (response.ok) {
        alert('Producto creado exitosamente');
        // Opcional: resetear el formulario
        setFormData({
          name: '',
          description: '',
          category_id: '',
          price_usd: '',
          original_price_usd: '',
          stock: 0,
          in_stock: false,
          is_active: true,
          brand: '',
          is_bestseller: false,
          is_new: false,
          rating: 0,
          review_count: 0,
          free_shipping: false,
          warranty: '',
          price_per_unit: '',
          sku: '',
          short_description: '',
          main_image: null,
          gallery_images: []
        });
        setLocalPreview(null);
      } else {
        alert('Error al crear el producto');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de red al crear el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName) => {
    if (fieldName === 'name' && !formData.name.trim()) return 'El nombre es requerido';
    if (fieldName === 'category_id' && !formData.category_id) return 'La categoría es requerida';
    if (fieldName === 'price_usd' && (!formData.price_usd || parseFloat(formData.price_usd) <= 0)) return 'El precio debe ser mayor a 0';
    if (fieldName === 'description' && !formData.description.trim()) return 'La descripción es requerida';
    return null;
  };

  // 👇 Imagen para la vista previa: prioridad a localPreview, luego image_url (aunque no se use en este flujo)
  const previewImageUrl = localPreview || '/default-product.png';

  const previewProduct = {
    id: 'preview',
    ...formData,
    price_usd: parseFloat(formData.price_usd) || 0,
    original_price_usd: formData.original_price_usd ? parseFloat(formData.original_price_usd) : null,
    stock: parseInt(formData.stock) || 0,
    rating: parseFloat(formData.rating) || 0,
    review_count: parseInt(formData.review_count) || 0,
    category: categories?.find(cat => cat.id === parseInt(formData.category_id)) || null,
    supplier: {
      name: 'Proveedor de Ejemplo',
      location: 'Ciudad, País',
      verified: true
    },
    image_url: previewImageUrl
  };

  return (
    <SuperAdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
        <div className="mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4">
              <PackageIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Crear Nuevo Producto</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete todos los campos necesarios para crear un producto.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Información básica */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <PackageIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">Información Básica</h2>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre del producto <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                            getFieldError('name') ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Ej: Auriculares Bluetooth..."
                        />
                        {getFieldError('name') && (
                          <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                          <input
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: AUD-BT-PRO-001"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
                          <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Ej: Sony, Apple"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Categoría <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="category_id"
                          value={formData.category_id}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            getFieldError('category_id') ? 'border-red-300' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Selecciona una categoría</option>
                          {categories?.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {getFieldError('category_id') && (
                          <p className="mt-1 text-sm text-red-600">{getFieldError('category_id')}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Precios y stock */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 text-green-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">Precios y Stock</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Precio (USD) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            step="0.01"
                            name="price_usd"
                            value={formData.price_usd}
                            onChange={handleInputChange}
                            required
                            min="0"
                            className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              getFieldError('price_usd') ? 'border-red-300' : 'border-gray-300'
                            }`}
                            placeholder="0.00"
                          />
                        </div>
                        {getFieldError('price_usd') && (
                          <p className="mt-1 text-sm text-red-600">{getFieldError('price_usd')}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Precio original (USD)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            step="0.01"
                            name="original_price_usd"
                            value={formData.original_price_usd}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Dejar vacío si no hay descuento</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stock <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="stock"
                          value={formData.stock}
                          onChange={handleInputChange}
                          required
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Precio por unidad</label>
                        <input
                          type="text"
                          name="price_per_unit"
                          value={formData.price_per_unit}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                          placeholder="/unidad, /kg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Características */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-purple-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">Características</h2>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="is_bestseller"
                          checked={formData.is_bestseller}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`block w-12 h-6 rounded-full transition-colors duration-200 ${formData.is_bestseller ? 'bg-orange-600' : 'bg-gray-300'}`}></div>
                        <span className="ml-3 text-sm font-medium text-gray-700">Más vendido</span>
                      </label>

                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="is_new"
                          checked={formData.is_new}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`block w-12 h-6 rounded-full transition-colors duration-200 ${formData.is_new ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                        <span className="ml-3 text-sm font-medium text-gray-700">Nuevo</span>
                      </label>

                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="free_shipping"
                          checked={formData.free_shipping}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`block w-12 h-6 rounded-full transition-colors duration-200 ${formData.free_shipping ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                        <span className="ml-3 text-sm font-medium text-gray-700">Envío gratis</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Garantía</label>
                      <input
                        type="text"
                        name="warranty"
                        value={formData.warranty}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: 2 años de garantía"
                      />
                    </div>
                  </div>

                  {/* Descripciones */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Tag className="w-4 h-4 text-amber-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">Descripciones</h2>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción corta</label>
                        <textarea
                          name="short_description"
                          value={formData.short_description}
                          onChange={handleInputChange}
                          rows="2"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
                          placeholder="Máximo 160 caracteres..."
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          {formData.short_description?.length || 0}/160 caracteres
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Descripción completa <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows="5"
                          required
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 resize-none ${
                            getFieldError('description') ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Describe el producto..."
                        />
                        {getFieldError('description') && (
                          <p className="mt-1 text-sm text-red-600">{getFieldError('description')}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Imágenes */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-cyan-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900">Imágenes del Producto</h2>
                    </div>

                    <div className="space-y-4">
                      <MultiImageUploader
                        onMainImageSelect={handleMainImageSelect}
                        onGalleryImagesSelect={handleGalleryImagesSelect}
                        initialMainImage={formData.image_url}
                        initialGallery={[]}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Vista previa */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 sticky top-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-gray-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Vista Previa</h2>
                </div>

                <div className="flex justify-center">
                  <div className="w-full max-w-xs">
                    <ProductCard
                      product={previewProduct}
                      userConfig={userConfig}
                      onViewDetails={() => {}}
                      onToggleFavorite={() => {}}
                      isFavorite={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default ProductCreate;
