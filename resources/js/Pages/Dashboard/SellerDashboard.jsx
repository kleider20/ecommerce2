import React from 'react';

const SellerDashboard = ({ user, ordersCount }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard - Vendedor</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Órdenes: {ordersCount}</p>
      </div>
    </div>
  );
};

export default SellerDashboard;
