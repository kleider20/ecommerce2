// // utils/formatCurrency.js
// export const formatCurrency = (amount, userConfig) => {
//   if (amount == null || !userConfig) {
//     return '0';
//   }

//   const {
//     currency_symbol: symbol = '',
//     currency_symbol_position: position = 'before',
//     currency_thousand_separator: thousandSep = ',',
//     currency_decimal_separator: decimalSep = '.',
//     currency_decimal_digits: decimalDigits = 2,
//   } = userConfig;

//   const num = typeof amount === 'string' ? parseFloat(amount) : amount;
//   if (isNaN(num)) return '0';

//   // Redondear y separar
//   const rounded = Math.round(num * Math.pow(10, decimalDigits)) / Math.pow(10, decimalDigits);
//   const fixed = rounded.toFixed(decimalDigits);
//   let [integer, decimal] = fixed.split('.');

//   // Formatear miles
//   if (thousandSep && integer.length > 3) {
//     integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);
//   }

//   // Formatear número
//   let numberPart = decimalDigits > 0 && decimal
//     ? `${integer}${decimalSep}${decimal}`
//     : integer;

//   // Posicionar símbolo
//   if (position === 'after') {
//     return `${numberPart} ${symbol}`.trim();
//   }
//   return `${symbol} ${numberPart}`.trim();
// };


// utils/formatCurrency.js
export const formatCurrency = (amount, userConfig) => {
  // Si no hay userConfig, usar valores por defecto seguros
  if (amount == null || typeof amount === 'string') {
    amount = parseFloat(amount) || 0;
  }
  if (isNaN(amount)) return '0';

  // Valores por defecto
  const defaults = {
    currency_symbol: '$',
    currency_symbol_position: 'before',
    currency_thousand_separator: ',',
    currency_decimal_separator: '.',
    currency_decimal_digits: 2,
  };

  // Combinar userConfig con defaults
  const config = { ...defaults, ...userConfig };

  const {
    currency_symbol: symbol,
    currency_symbol_position: position,
    currency_thousand_separator: thousandSep,
    currency_decimal_separator: decimalSep,
    currency_decimal_digits: digits,
  } = config;

  // Redondear
  const rounded = Number(amount).toFixed(digits);
  let [integer, decimal] = rounded.split('.');

  // Formatear miles
  if (thousandSep && integer.length > 3) {
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);
  }

  // Combinar
  const numberPart = digits > 0 && decimal
    ? `${integer}${decimalSep}${decimal}`
    : integer;

  return position === 'after'
    ? `${numberPart} ${symbol}`.trim()
    : `${symbol} ${numberPart}`.trim();
};
