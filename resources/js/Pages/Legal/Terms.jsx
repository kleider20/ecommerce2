// resources/js/Pages/Legal/Terms.jsx
import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FileText, Shield, Users, Globe } from 'lucide-react';

const Terms = () => {
  return (
    <GuestLayout>
      <div className="mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Términos de Servicio</h1>
            <p className="text-gray-600">Última actualización: Enero 2026</p>
          </div>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                1. Aceptación de Términos
              </h2>
              <p>
                Al acceder y utilizar nuestra plataforma, usted acepta cumplir con
                todos los términos, condiciones y políticas aquí establecidas.
                Si no está de acuerdo con alguno de estos términos, no debe utilizar
                nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5" />
                2. Registro y Cuentas
              </h2>
              <p>
                Para acceder a ciertas funciones de la plataforma, debe crear una cuenta.
                Usted es responsable de mantener la confidencialidad de su contraseña y
                de toda la actividad que ocurra en su cuenta.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                3. Uso Aceptable
              </h2>
              <p>
                Usted se compromete a utilizar la plataforma de manera responsable y legal.
                Está estrictamente prohibido:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Utilizar la plataforma para actividades ilegales o fraudulentas</li>
                <li>Interferir con el funcionamiento de la plataforma</li>
                <li>Violar los derechos de propiedad intelectual de terceros</li>
                <li>Enviar contenido ofensivo, difamatorio o ilegal</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                4. Modificaciones
              </h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento.
                Las modificaciones entrarán en vigor inmediatamente después de su publicación
                en esta página. Su uso continuado de la plataforma después de dichas
                modificaciones constituye su aceptación de los nuevos términos.
              </p>
            </section>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Terms;
