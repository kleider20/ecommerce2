// resources/js/Components/ProductGrid.jsx
import React from 'react';
import ProductCard from '@/Components/MainLayout/ProductCard';

const ProductGrid = ({ products, selectedCategory, categories, onClearFilters, userConfig, searchTerm = '' }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {searchTerm
            ? `No se encontraron resultados para "${searchTerm}"`
            : 'No se encontraron productos'}
        </h3>
        <p className="text-gray-600">
          {searchTerm
            ? 'Intenta con otra palabra o ajusta los filtros'
            : 'Intenta ajustar tus filtros de búsqueda'}
        </p>
        <button
          onClick={onClearFilters}
          className="mt-4 text-blue-600 hover:underline font-medium"
        >
          Limpiar filtros
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {categoryName}
          <span className="text-gray-600 font-normal ml-2">({products.length} productos)</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} userConfig={userConfig} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
