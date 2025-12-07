// resources/js/Pages/SuperAdmin/GlobalSettings/Edit.jsx
import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';
import { Save, RotateCcw, DollarSign, Globe } from 'lucide-react';

const CURRENCY_OPTIONS = [
  { code: 'USD', name: 'Dólar Estadounidense', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'VES', name: 'Bolívar Soberano', symbol: 'Bs' },
  { code: 'COP', name: 'Peso Colombiano', symbol: '$' },
  { code: 'MXN', name: 'Peso Mexicano', symbol: '$' },
];

const SystemConfigEdit = ({ systemConfig }) => {
  const [formData, setFormData] = useState({
    base_currency_code: systemConfig.base_currency_code,
    base_currency_symbol: systemConfig.base_currency_symbol,
    exchange_rates: { ...systemConfig.exchange_rates },
  });

  const [preview, setPreview] = useState({
    product_price_base: 5, // 5 unidades en moneda base
    conversions: {}
  });

  // Calcular vista previa en tiempo real
  useEffect(() => {
    const conversions = {};
    Object.keys(formData.exchange_rates).forEach(currency => {
      const rate = parseFloat(formData.exchange_rates[currency]) || 0;
      conversions[currency] = (preview.product_price_base * rate).toFixed(2);
    });
    setPreview(prev => ({ ...prev, conversions }));
  }, [formData, preview.product_price_base]);

  const handleCurrencyChange = (code, symbol) => {
    setFormData(prev => ({
      ...prev,
      base_currency_code: code,
      base_currency_symbol: symbol,
    }));
  };

  const handleRateChange = (currency, value) => {
    setFormData(prev => ({
      ...prev,
      exchange_rates: {
        ...prev.exchange_rates,
        [currency]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la llamada a Inertia.put('/superadmin/global-settings', formData)
    alert('Configuración guardada (simulado)');
  };

  return (
    <SuperAdminLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Configuración Global del Sistema</h1>
          <p className="text-gray-600">Gestiona la moneda base y las tasas de cambio para todo el sistema.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Sección 1: Moneda Base */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-900">Moneda Base del Sistema</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Recomendamos usar <strong>Dólar Estadounidense (USD)</strong> como moneda base para facilitar conversiones internacionales.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {CURRENCY_OPTIONS.map(currency => (
                <button
                  key={currency.code}
                  type="button"
                  onClick={() => handleCurrencyChange(currency.code, currency.symbol)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    formData.base_currency_code === currency.code
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">{currency.name}</div>
                  <div className="text-sm text-gray-500">{currency.symbol} ({currency.code})</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sección 2: Tasas de Cambio */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-900">Tasas de Cambio</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Define cuántas unidades de cada moneda equivalen a <strong>1 {formData.base_currency_symbol} ({formData.base_currency_code})</strong>.
            </p>

            <div className="space-y-4">
              {Object.entries(formData.exchange_rates).map(([currency, rate]) => (
                <div key={currency} className="flex items-center space-x-4">
                  <div className="w-24 font-medium">{currency}</div>
                  <div className="text-gray-500">1 {formData.base_currency_code} = </div>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={rate}
                    onChange={(e) => handleRateChange(currency, e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="text-gray-500">{currency}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sección 3: Vista Previa */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Vista Previa de Precios</h2>
            <p className="text-sm text-gray-600 mb-4">
              Ejemplo: producto de <strong>{preview.product_price_base} {formData.base_currency_symbol}</strong>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(preview.conversions).map(([currency, price]) => (
                <div key={currency} className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">{currency}</div>
                  <div className="font-medium">{price} {currency}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex space-x-3">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar Configuración
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </SuperAdminLayout>
  );
};

export default SystemConfigEdit;
