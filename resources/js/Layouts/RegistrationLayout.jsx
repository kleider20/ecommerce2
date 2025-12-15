// components/Registration/RegistrationLayout.jsx
import React from 'react';

const RegistrationLayout = ({ children, currentStep, totalSteps = 3 }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-4xl w-full p-8 md:p-12">
        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[...Array(totalSteps)].map((_, index) => {
              const step = index + 1;
              return (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  {step < totalSteps && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {children}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationLayout;
