// resources/js/Layouts/2026/Home/Components/ProductsGridSection.jsx
import React from 'react';
import ProductCard from '@/Components/2026/HomeLayout/ProductCard';
import { Package, ChevronRight, Filter, Sliders } from 'lucide-react';

const ProductsGridSection = ({ products = [], globalConfig }) => {
  // Aquí iría toda la lógica de filtros, búsqueda y ordenamiento
  // Por simplicidad, mostramos solo los productos

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Todos los Productos</h2>
            <p className="text-gray-600 mt-1">{products.length} productos encontrados</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">Ordenar por:</label>
              <select id="sort" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Destacados</option>
              </select>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsGridSection;
