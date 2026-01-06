// resources/js/Pages/Dashboard/SuperAdminDashboard.jsx
import React from 'react';

const SuperAdminDashboard = ({ user, layoutYear }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard - Super Admin</h1>
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Estadísticas del Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-gray-600">Usuarios Totales</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold">56</p>
            <p className="text-gray-600">Proveedores Activos</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold">89</p>
            <p className="text-gray-600">Vendedores Activos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
