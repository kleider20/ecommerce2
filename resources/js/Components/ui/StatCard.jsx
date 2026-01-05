// resources/js/Components/ui/StatCard.jsx
import React from 'react';

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-4 rounded-lg border">
    <div className="flex justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <Icon className="w-6 h-6 text-blue-500" />
    </div>
  </div>
);

export default StatCard;
