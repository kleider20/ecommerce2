// resources/js/Layouts/2026/Users/components/StatusBadge.jsx
import React from 'react';

const StatusBadge = ({ status }) => {
  const getColor = (s) => {
    switch (s) {
      case 'Entregado': return 'text-green-600 bg-green-100';
      case 'En tránsito': return 'text-blue-600 bg-blue-100';
      case 'Procesando': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getColor(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
