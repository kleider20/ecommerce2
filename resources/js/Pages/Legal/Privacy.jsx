// resources/js/Pages/Legal/Privacy.jsx
import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Lock, Database, Users, Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <GuestLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Política de Privacidad</h1>
            <p className="text-gray-600">Última actualización: Enero 2026</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                1. Información que Recopilamos
              </h2>
              <p>
                Recopilamos información personal que usted proporciona directamente,
                incluyendo:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Nombre y apellidos</li>
                <li>Correo electrónico</li>
                <li>Teléfono</li>
                <li>Dirección</li>
                <li>Información de pago</li>
                <li>Datos de perfil específicos según su rol</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Database className="w-5 h-5" />
                2. Uso de la Información
              </h2>
              <p>
                Utilizamos su información personal para:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Crear y gestionar su cuenta</li>
                <li>Procesar transacciones y pedidos</li>
                <li>Mejorar nuestros servicios y productos</li>
                <li>Enviar comunicaciones importantes</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                3. Protección de Datos
              </h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas
                para proteger sus datos personales contra el acceso no autorizado,
                la alteración, la divulgación o la destrucción.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5" />
                4. Compartir Información
              </h2>
              <p>
                No compartimos su información personal con terceros, excepto en los
                siguientes casos:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Con su consentimiento explícito</li>
                <li>Para cumplir con obligaciones legales</li>
                <li>Con proveedores de servicios que procesan datos en nuestro nombre</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Privacy;
