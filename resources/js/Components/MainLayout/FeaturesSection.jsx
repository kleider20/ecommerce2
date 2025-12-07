// resources/js/Components/FeaturesSection.jsx
import React from 'react';
import { Truck, Shield, RotateCcw } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Truck className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Envío Gratis</h3>
            <p className="text-gray-600 text-sm">En compras superiores a $100</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Pago Seguro</h3>
            <p className="text-gray-600 text-sm">Transacciones 100% seguras</p>
          </div>
          <div className="flex flex-col items-center">
            <RotateCcw className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Devolución Fácil</h3>
            <p className="text-gray-600 text-sm">30 días de garantía</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
