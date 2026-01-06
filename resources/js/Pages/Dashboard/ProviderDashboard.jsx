// resources/js/Pages/Dashboard/ProviderDashboard.jsx
import React from 'react';

const ProviderDashboard = ({ user, productsCount }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard - Proveedor</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Resumen de Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-green-700">{productsCount || 0}</p>
            <p className="text-green-700">Productos Activos</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-blue-700">12</p>
            <p className="text-blue-700">Órdenes Recientes</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-purple-700">3</p>
            <p className="text-purple-700">Nuevas Reseñas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
