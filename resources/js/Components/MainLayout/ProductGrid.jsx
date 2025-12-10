import React from 'react';
import ProductCard from '@/Components/MainLayout/ProductCard';

const ProductGrid = ({ products, selectedCategory, categories, onClearFilters, userConfig, searchTerm = '' }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {searchTerm
            ? `No se encontraron resultados para "${searchTerm}"`
            : 'No se encontraron productos en esta categoría'}
        </h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          {searchTerm
            ? 'No pudimos encontrar productos que coincidan con tu búsqueda. Intenta con términos diferentes o ajusta los filtros.'
            : 'Actualmente no hay productos disponibles en esta categoría. Por favor, intenta con otra categoría o ajusta los filtros.'}
        </p>
        <button
          onClick={onClearFilters}
          className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Limpiar todos los filtros
        </button>
      </div>
    );
  }

  const categoryName =
    selectedCategory === 'todos'
      ? 'Todos los Productos'
      : categories.find(c => c.id === selectedCategory)?.name || '';

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {categoryName}
            </h1>
            <p className="text-gray-600 mt-1">
              {products.length} {products.length === 1 ? 'producto' : 'productos'} encontrado{products.length === 1 ? '' : 's'}
            </p>
          </div>
          {products.length > 0 && (
            <div className="mt-4 sm:mt-0">
              <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {products.length} resultados
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="animate-fade-in">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
          {products.map((product) => (
            <div key={product.id} className="transform transition-all duration-300 hover:scale-105">
              <ProductCard product={product} userConfig={userConfig} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductGrid;

