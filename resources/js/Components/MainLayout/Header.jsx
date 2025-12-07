
// resources/js/Components/Header.jsx
import React, { useState, useRef } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';
import CountrySelector from '@/Components/MainLayout/CountrySelector';

const Header = ({ searchTerm, onSearchChange }) => {
  const { auth } = usePage().props;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Cerrar menú al hacer clic fuera
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    router.post('/logout');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TechStore</span>
          </div>

          {/* Barra de búsqueda */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Acciones derecho */}
          <div className="flex items-center space-x-4">
            <CountrySelector />

            {/* Carrito */}
            <button className="p-2 text-gray-600 hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
            </button>

            {/* Autenticación */}
            <div className="relative" ref={profileRef}>
              {auth.user ? (
                /* Usuario autenticado */
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-700 font-semibold text-sm">
                      {auth.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:inline text-sm font-medium">{auth.user.name}</span>
                </button>
              ) : (
                /* Usuario no autenticado */
                <div className="flex space-x-2">
                  <a
                    href="/login"
                    className="px-3 py-1.5 text-sm text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Iniciar sesión
                  </a>
                  <a
                    href="/register"
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                  >
                    Registrarse
                  </a>
                </div>
              )}

              {/* Menú desplegable (solo si está autenticado) */}
              {isProfileOpen && auth.user && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      Hola, <span className="font-semibold">{auth.user.name}</span>
                    </div>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mi perfil
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
