// resources/js/Pages/ProductIndex.jsx
import React, { useState, useMemo } from 'react';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import {
  Search, Plus, Filter, Download, Package, Eye, Edit, Trash2, Activity
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';

const ProductIndex = ({ products, globalConfig }) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nombre');

  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Extraer categorías únicas de los productos (en lugar de hardcodear)
  const categories = useMemo(() => {
    const unique = [...new Set(products.map(p => p.category))];
    return ['todos', ...unique.sort()];
  }, [products]);

  // Inferir estado a partir de stock e in_stock
  const getProductStatus = (product) => {
    if (!product.in_stock) return 'agotado';
    if (product.stock === 0) return 'agotado';
    if (product.stock < 10) return 'bajo_stock';
    return 'activo';
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'activo':
        return <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">Activo</span>;
      case 'bajo_stock':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Bajo Stock</span>;
      case 'agotado':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Agotado</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Inactivo</span>;
    }
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'nombre':
            return a.name.localeCompare(b.name);
          case 'precio-asc':
            return a.price_usd - b.price_usd;
          case 'precio-desc':
            return b.price_usd - a.price_usd;
          case 'stock':
            return b.stock - a.stock;
          case 'fecha':
            return new Date(b.created_at) - new Date(a.created_at);
          default:
            return 0;
        }
      });
  }, [products, searchTerm, selectedCategory, sortBy]);

  return (
    <SuperAdminLayout globalConfig={globalConfig}>
      <div className="flex-1">
        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Productos</h1>
                <p className="text-gray-600">{currentDate}</p>
              </div>
              <button className="mt-4 sm:mt-0 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Nuevo Producto</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'todos' ? 'Todas las categorías' : category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-10 pr-8 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
                  >
                    <option value="nombre">Ordenar por Nombre</option>
                    <option value="precio-asc">Precio: Menor a Mayor</option>
                    <option value="precio-desc">Precio: Mayor a Menor</option>
                    <option value="stock">Stock Disponible</option>
                    <option value="fecha">Fecha de Creación</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Exportar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imágenes</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
                        <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => {
                      const status = getProductStatus(product);
                      return (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                                <Package className="h-5 w-5 text-gray-500" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">ID: {product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{product.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(product.price_usd, globalConfig)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${
                              product.stock === 0 ? 'text-red-600' :
                              product.stock < 10 ? 'text-yellow-600' : 'text-gray-900'
                            }`}>
                              {product.stock}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {product.image_url ? '1 imagen' : 'Sin imagen'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-emerald-600 hover:text-emerald-900 p-1.5 rounded-lg hover:bg-emerald-50 transition-colors duration-150">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-blue-600 hover:text-blue-900 p-1.5 rounded-lg hover:bg-blue-50 transition-colors duration-150">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900 p-1.5 rounded-lg hover:bg-red-50 transition-colors duration-150">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination (placeholder) */}
            {filteredProducts.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">1</span> a <span className="font-medium">{Math.min(8, filteredProducts.length)}</span> de{' '}
                  <span className="font-medium">{filteredProducts.length}</span> resultados
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                    Anterior
                  </button>
                  <button className="px-3 py-1.5 text-sm rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-150">
                    1
                  </button>
                  <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                    2
                  </button>
                  <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SuperAdminLayout>
  );
};

export default ProductIndex;
