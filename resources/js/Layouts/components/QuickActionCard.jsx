// resources/js/Layouts/2026/Users/components/QuickActionCard.jsx
import React from 'react';

const QuickActionCard = ({ icon: IconComponent, label, color = 'bg-blue-100 text-blue-600' }) => (
  <button className={`p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col items-center gap-2 ${color}`}>
    {IconComponent && <IconComponent className="w-6 h-6" />} {/* ✅ Renderiza el componente */}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default QuickActionCard;
