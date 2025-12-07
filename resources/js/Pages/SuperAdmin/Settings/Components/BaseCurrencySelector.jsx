// resources/js/Pages/SuperAdmin/Settings/Components/BaseCurrencySelector.jsx
import React, { useState, useMemo } from 'react';
import { Globe, Save, Eye } from 'lucide-react';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';

// Función de formato (reutilizable)
const formatPreview = (amount, country) => {
  if (!country) return '0.00';
  const {
    currency_symbol: symbol = '',
    currency_symbol_position: position = 'before',
    currency_thousand_separator: thousandSep = ',',
    currency_decimal_separator: decimalSep = '.',
    currency_decimal_digits: digits = 2,
  } = country;
  const rounded = Number(amount).toFixed(digits);
  let [integer, decimal] = rounded.split('.');
  if (thousandSep && integer.length > 3) {
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);
  }
  const numberPart = digits > 0 && decimal
    ? `${integer}${decimalSep}${decimal}`
    : integer;
  return position === 'after'
    ? `${numberPart} ${symbol}`.trim()
    : `${symbol} ${numberPart}`.trim();
};

const BaseCurrencySelector = ({ selectedCurrency, countries, onCurrencyChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    router.put(
      route('settings.currencybase.update'),
      { base_currency_code: selectedCurrency },
      {
        onFinish: () => setIsSubmitting(false),
        onSuccess: () => {
          toast.success('Moneda base actualizada');
          if (onCurrencyChange) onCurrencyChange(selectedCurrency);
        },
        onError: (errors) => {
          toast.error('Error al guardar la configuración');
          console.error('Errores:', errors);
        }
      }
    );
  };

  const uniqueCurrencies = useMemo(() => {
    return Array.from(
      new Map(
        countries
          .filter(c => c.currency_code && c.currency_name)
          .map(c => [c.currency_code, c])
      ).values()
    ).sort((a, b) => (a.currency_name || '').localeCompare(b.currency_name || ''));
  }, [countries]);

  const selectedCountry = useMemo(() => {
    return countries.find(c => c.currency_code === selectedCurrency) || null;
  }, [selectedCurrency, countries]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Formulario (3/4) */}
      <div className="lg:col-span-3">
        <form onSubmit={handleSubmit}>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="h-6 w-6 text-emerald-600" />
              <h2 className="text-xl font-bold text-gray-900">Moneda Base del Sistema</h2>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              La moneda base se usa para todos los cálculos internos y conversión de precios.
              Recomendamos usar <strong>Dólar Estadounidense (USD)</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moneda Base
                </label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => onCurrencyChange(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                >
                  {uniqueCurrencies.map(country => (
                    <option key={country.currency_code} value={country.currency_code}>
                      {country.currency_name} ({country.currency_code}) - {country.currency_symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
              >
                <Save className="h-5 w-5 mr-2" />
                {isSubmitting ? 'Guardando...' : 'Guardar Moneda Base'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Vista previa (1/4) */}
      <div className="lg:col-span-1">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 sticky top-6">
          <div className="flex items-center space-x-2 mb-4">
            <Eye className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-gray-900">Vista Previa</h2>
          </div>

          {selectedCountry ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Moneda</p>
                <p className="font-medium text-gray-900">
                  {selectedCountry.currency_name} ({selectedCountry.currency_code})
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Símbolo</p>
                <p className="font-medium text-gray-900">{selectedCountry.currency_symbol}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Ejemplo de precio</p>
                <div className="mt-1 p-3 bg-emerald-50 rounded-lg">
                  <p className="font-mono text-lg font-bold text-emerald-800">
                    {formatPreview(1234567.89, selectedCountry)}
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-500 space-y-1 pt-2 border-t">
                <div>• Separador miles: "<span className="font-mono">{selectedCountry.currency_thousand_separator}</span>"</div>
                <div>• Separador decimal: "<span className="font-mono">{selectedCountry.currency_decimal_separator}</span>"</div>
                <div>• Símbolo: {selectedCountry.currency_symbol_position === 'after' ? 'después' : 'antes'}</div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">Selecciona una moneda para ver la vista previa.</p>
          )}

          <div className="mt-6 text-xs text-gray-500 text-center">
            Esta vista previa muestra cómo se verán los precios en tu tienda.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseCurrencySelector;
