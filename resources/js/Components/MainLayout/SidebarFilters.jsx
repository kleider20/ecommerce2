// resources/js/Components/SidebarFilters.jsx
import React from 'react';
import { Filter } from 'lucide-react';

const SidebarFilters = ({ categories, selectedCategory, onCategoryChange, sortBy, onSortChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Filter className="h-5 w-5 mr-2" />
        Filtros
      </h2>

      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Categorías</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{category.name}</span>
                <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs">
                  {category.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 mb-3">Ordenar por</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="popularidad">Más Populares</option>
          <option value="calificacion">Mejor Calificación</option>
          <option value="precio-asc">Precio: Menor a Mayor</option>
          <option value="precio-desc">Precio: Mayor a Menor</option>
        </select>
      </div>
    </div>
  );
};

export default SidebarFilters;
