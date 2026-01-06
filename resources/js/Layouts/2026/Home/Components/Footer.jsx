// resources/js/Layouts/2026/Home/Components/Footer.jsx
import React from 'react';
import { ShoppingBag, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ShopNova</h3>
                <p className="text-blue-300">2026</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              La plataforma de comercio electrónico más innovadora del 2026.
            </p>
            <div className="flex gap-3">
              {['f', 't', 'i'].map((social, index) => (
                <div key={index} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">{social}</span>
                </div>
              ))}
            </div>
          </div>

          {['Categorías', 'Soporte', 'Contacto'].map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-lg mb-4">{section}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Enlace 1</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enlace 2</a></li>
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 ShopNova. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
