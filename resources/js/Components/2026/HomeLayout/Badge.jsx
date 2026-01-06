// resources/js/Components/2026/HomeLayout/Badge.jsx
import React from 'react';

const Badge = ({ type, text }) => {
  const getBadgeColor = (badgeType) => {
    const colors = {
      'new': 'bg-green-500 text-white',
      'bestseller': 'bg-orange-500 text-white',
      'offer': 'bg-red-500 text-white',
      'premium': 'bg-purple-500 text-white',
      'popular': 'bg-blue-500 text-white'
    };
    return colors[badgeType] || 'bg-gray-500 text-white';
  };

  return (
    <span className={`text-xs font-bold px-2 py-1 rounded-full ${getBadgeColor(type)}`}>
      {text}
    </span>
  );
};

export default Badge;
