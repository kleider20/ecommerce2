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


// // utils/formatCurrency.js
// export const formatCurrency = (amount, config) => {
//   if (amount == null || !config) {
//     return '0';
//   }

//   // Obtener valores desde la configuración (de la tabla `countries`)
//   const digits = config.currency_decimal_digits != null
//     ? config.currency_decimal_digits
//     : 2;

//   const thousandSep = config.currency_thousand_separator || '.';
//   const decimalSep = config.currency_decimal_separator || ',';
//   const symbol = config.currency_symbol || '';
//   const position = config.currency_symbol_position || 'before';

//   // Asegurar que amount sea número
//   const num = typeof amount === 'number' ? amount : parseFloat(amount);
//   if (isNaN(num)) return '0';

//   // Redondear
//   const rounded = num.toFixed(digits);
//   let [integer, decimal] = rounded.split('.');

//   // Formatear miles: insertar `thousandSep` cada 3 dígitos desde la derecha
//   if (thousandSep && integer?.length > 3) {
//     // Convertir a array, invertir, agrupar, volver a invertir
//     integer = integer
//       .split('')
//       .reverse()
//       .join('')
//       .replace(/(\d{3})(?=\d)/g, `$1${thousandSep}`)
//       .split('')
//       .reverse()
//       .join('');
//   }

//   // Combinar partes
//   const numberPart = digits > 0 && decimal
//     ? `${integer}${decimalSep}${decimal}`
//     : integer;

//   // Posicionar símbolo
//   if (position === 'after') {
//     return `${numberPart} ${symbol}`.trim();
//   }
//   return `${symbol} ${numberPart}`.trim();
// };
