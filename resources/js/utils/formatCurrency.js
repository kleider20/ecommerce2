// utils/formatCurrency.js
export const formatCurrency = (amount, userConfig) => {
  if (amount == null || !userConfig) {
    return '0';
  }

  const {
    currency_symbol: symbol = '',
    currency_symbol_position: position = 'before',
    currency_thousand_separator: thousandSep = ',',
    currency_decimal_separator: decimalSep = '.',
    currency_decimal_digits: decimalDigits = 2,
  } = userConfig;

  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '0';

  // Redondear y separar
  const rounded = Math.round(num * Math.pow(10, decimalDigits)) / Math.pow(10, decimalDigits);
  const fixed = rounded.toFixed(decimalDigits);
  let [integer, decimal] = fixed.split('.');

  // Formatear miles
  if (thousandSep && integer.length > 3) {
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);
  }

  // Formatear número
  let numberPart = decimalDigits > 0 && decimal
    ? `${integer}${decimalSep}${decimal}`
    : integer;

  // Posicionar símbolo
  if (position === 'after') {
    return `${numberPart} ${symbol}`.trim();
  }
  return `${symbol} ${numberPart}`.trim();
};
