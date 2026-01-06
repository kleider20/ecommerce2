// resources/js/Layouts/2026/Home/Components/FeaturesSection.jsx
import React from 'react';
import { Truck, Shield, Package, Award } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    { icon: Truck, title: 'Envío Gratis', subtitle: 'En pedidos +$50', bg: 'bg-blue-50', color: 'text-blue-600' },
    { icon: Shield, title: 'Pago Seguro', subtitle: '100% garantizado', bg: 'bg-green-50', color: 'text-green-600' },
    { icon: Package, title: 'Devoluciones', subtitle: '30 días sin preguntas', bg: 'bg-purple-50', color: 'text-purple-600' },
    { icon: Award, title: 'Soporte 24/7', subtitle: 'Atención personalizada', bg: 'bg-orange-50', color: 'text-orange-600' }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className={`flex items-center gap-3 p-4 ${feature.bg} rounded-xl`}>
                <IconComponent className={`w-8 h-8 ${feature.color}`} />
                <div>
                  <p className="font-semibold text-gray-900">{feature.title}</p>
                  <p className="text-sm text-gray-600">{feature.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
