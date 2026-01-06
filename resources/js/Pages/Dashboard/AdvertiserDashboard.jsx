// resources/js/Pages/Dashboard/AdvertiserDashboard.jsx
import React from 'react';

const AdvertiserDashboard = ({ user, adsCount }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard - Anunciante</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Tus Anuncios</h2>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-3xl font-bold text-purple-700">{adsCount || 0}</p>
          <p className="text-purple-700">Anuncios Activos</p>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;
