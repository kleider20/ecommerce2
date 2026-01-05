// resources/js/Layouts/2026/Users/components/StatCard.jsx
import React from 'react';

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <Icon className="w-8 h-8 text-blue-500" />
    </div>
  </div>
);

export default StatCard;
