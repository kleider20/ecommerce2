// resources/js/Layouts/BaseLayout.jsx
import React from 'react';

// Layout base genérico (equivalente a GuestLayout)
const BaseLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-100">
    {/* Aquí podrías tener un header genérico si lo deseas */}
    <main className="container mx-auto px-4 py-8">
      {children}
    </main>
  </div>
);

export default BaseLayout;
