// resources/js/Layouts/2026/Home/Components/MobileMenu.jsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from '@inertiajs/react';

const MobileMenu = ({ isOpen, categories = [], menuItems = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-200">
      <div className="px-4 py-4 space-y-4">
        {/* Menú principal */}
        {menuItems.map(item => {
          if (item.id === 'categories') {
            return (
              <div key={item.id}>
                <button className="w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 flex items-center justify-between">
                  {item.label} <ChevronDown className="w-4 h-4" />
                </button>
                <div className="pl-4 mt-2 space-y-2">
                  {categories.slice(0, 6).map((category) => (
                    <Link
                      key={category.id}
                      href={route('category.show', { category: category.slug || category.id })}
                      className="block text-gray-600 hover:text-blue-600 py-1"
                    >
                      {category.name} ({category.count})
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.id}
              href={route(item.routeName)}
              className="block text-gray-700 hover:text-blue-600 font-medium py-2"
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;
