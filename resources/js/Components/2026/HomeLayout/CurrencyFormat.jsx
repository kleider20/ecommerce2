// resources/js/Components/2026/HomeLayout/CurrencyFormat.jsx
import React from 'react';

const CurrencyFormat = ({ value }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return <>{formatCurrency(value)}</>;
};

export default CurrencyFormat;
