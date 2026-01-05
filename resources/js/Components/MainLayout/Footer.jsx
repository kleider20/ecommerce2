// resources/js/Components/Footer.jsx
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from '@inertiajs/react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ShoppingCart className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold">TechStore</span>
          </div>
          <p className="text-gray-400 mb-6">
            Tu tienda de tecnología de confianza con los mejores precios y productos de calidad.
          </p>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TechStore. Todos los derechos reservados. Creado por <strong>Kleider Rosamilia</strong></p>
            <div className="mt-2 space-x-4">
        <Link
          href="/terms"
          className="text-gray-300 hover:text-white text-sm"
        >
          Términos de Servicio
        </Link>
        <Link
          href="/privacy"
          className="text-gray-300 hover:text-white text-sm"
        >
          Política de Privacidad
        </Link>
      </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
