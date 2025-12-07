// resources/js/Components/CurrencySettingsSection.jsx
import React from 'react';
import { DollarSign } from 'lucide-react';

const CurrencySettingsSection = ({
  config,
  currencies,
  onCurrencyChange,
  onInputChange,
}) => {
  const formatPreview = () => {
    const amount = 1234.5678;
    const formatted = amount.toFixed(config.decimalDigits);
    const [integer, decimal] = formatted.split('.');
    const formattedInteger = integer.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      config.thousandSeparator
    );
    const fullNumber = decimal
      ? `${formattedInteger}${config.decimalSeparator}${decimal}`
      : formattedInteger;
    return config.currencyPosition === 'before'
      ? `${config.currencySymbol}${fullNumber}`
      : `${fullNumber}${config.currencySymbol}`;
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <DollarSign className="h-6 w-6 text-green-600" />
        <h2 className="text-xl font-bold text-gray-900">Configuración de Moneda</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Moneda Predeterminada *
          </label>
          <select
            value={config.currency}
            onChange={(e) => onCurrencyChange(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.code}) - {currency.symbol}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Símbolo de Moneda *
          </label>
          <input
            type="text"
            required
            value={config.currencySymbol}
            onChange={(e) => onInputChange('currencySymbol', e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="$, €, £, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Posición del Símbolo
          </label>
          <select
            value={config.currencyPosition}
            onChange={(e) => onInputChange('currencyPosition', e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="before">Antes del número (Ej: $1,234.56)</option>
            <option value="after">Después del número (Ej: 1,234.56$)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Separador de Miles
          </label>
          <input
            type="text"
            maxLength="1"
            value={config.thousandSeparator}
            onChange={(e) => onInputChange('thousandSeparator', e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Ej: , o . o espacio"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Separador Decimal
          </label>
          <input
            type="text"
            maxLength="1"
            value={config.decimalSeparator}
            onChange={(e) => onInputChange('decimalSeparator', e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Ej: . o ,"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dígitos Decimales
          </label>
          <select
            value={config.decimalDigits}
            onChange={(e) =>
              onInputChange('decimalDigits', parseInt(e.target.value))
            }
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value={0}>0 (1234)</option>
            <option value={1}>1 (1234.5)</option>
            <option value={2}>2 (1234.56)</option>
            <option value={3}>3 (1234.567)</option>
            <option value={4}>4 (1234.5678)</option>
          </select>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          Vista Previa de Formato
        </h3>
        <div className="text-lg font-bold text-green-900">{formatPreview()}</div>
        <p className="text-xs text-green-700 mt-1">
          Este es cómo se mostrarán los precios en todo el sitio
        </p>
      </div>
    </div>
  );
};

export default CurrencySettingsSection;
