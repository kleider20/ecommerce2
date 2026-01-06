// resources/js/Pages/Dashboard/UserDashboard.jsx
import React from 'react';

const UserDashboard = ({ user, stats, quickActions }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Hola, {user.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Órdenes Totales</p>
          <p className="text-2xl font-bold">{stats?.totalOrders || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Gastado</p>
          <p className="text-2xl font-bold">{stats?.totalSpent || '$0'}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Órdenes Pendientes</p>
          <p className="text-2xl font-bold">{stats?.pendingOrders || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Favoritos</p>
          <p className="text-2xl font-bold">{stats?.wishlistItems || 0}</p>
        </div>
      </div>

      {quickActions && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-blue-600">{action.icon}</span>
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
