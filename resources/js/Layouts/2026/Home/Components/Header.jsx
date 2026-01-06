// resources/js/Layouts/2026/Home/Components/Header.jsx
import React, { useState } from 'react';
import { ShoppingBag, Search, User, Heart, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { usePage, Link } from '@inertiajs/react';
import CountrySelector from '@/Components/MainLayout/CountrySelector';
import MobileMenu from './MobileMenu';
import { getHeaderMenuByPermission } from '@/utils/headerMenuConfig';

import Logo from '@/Components/Global/Logo';

const Header = ({
  cartItems = 0,
  wishlistItems = 0,
  searchTerm = '',
  onSearchChange = () => {},
  categories = []
}) => {
  const { props } = usePage();
  const auth = props.auth;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Obtener menú dinámico basado en roles y permisos
  const userRoles = auth?.user?.roles || [];
  const userPermissions = auth?.user?.permissions || [];
  const menuItems = getHeaderMenuByPermission(userRoles, userPermissions);

  const renderMenuItem = (item) => {
    const isActive = route().current(item.routeName);
    const itemRoute = route(item.routeName);

    if (item.id === 'categories') {
      // ✅ Menú desplegable de categorías
      return (
        <div key={item.id} className="relative group">
          <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center gap-1 transition-colors">
            {item.label} <ChevronDown className="w-4 h-4" />
          </button>
          <div className="absolute hidden group-hover:block top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50">
            <div className="grid grid-cols-2 gap-3">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category.id}
                  href={route('category.show', { category: category.slug || category.id })}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{category.name}</span>
                  <span className="text-xs text-gray-500">({category.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // ✅ Enlace normal
    return (
      <Link
        key={item.id}
        href={itemRoute}
        className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${
          isActive ? 'text-blue-600 font-bold' : ''
        }`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo/>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map(renderMenuItem)}
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar productos o proveedores..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 transition-all"
                />
              </div>

              <div className="hidden md:block">
                <CountrySelector />
              </div>

              <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <Heart className="w-5 h-5" />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistItems}
                  </span>
                )}
              </button>
              <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartItems}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos o proveedores..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        categories={categories}
        menuItems={menuItems} // 👈 Pasamos los mismos items
      />
    </>
  );
};

export default Header;
