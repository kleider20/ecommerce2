// resources/js/Pages/SuperAdmin/Settings/Components/CountryExchangeRates.jsx
import React, { useState, useEffect } from 'react';
import { RefreshCw, Edit3, X, Save } from 'lucide-react';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';

const CountryExchangeRates = ({
  countries,
  baseCurrencyCode = 'USD',
  operatingCountryIso2,
  onRatesChange
}) => {
  const operatingCountry = countries.find(c => c.iso2 === operatingCountryIso2);
  const activeRate = operatingCountry
    ? (parseFloat(operatingCountry.exchange_rate_to_usd) || 1.0)
    : 1.0;

  const [rates, setRates] = useState(() => {
    const initial = {};
    countries.forEach(country => {
      initial[country.currency_code] = parseFloat(country.exchange_rate_to_usd || '1').toFixed(4);
    });
    return initial;
  });

  const [originalRates, setOriginalRates] = useState({ ...rates });
  const [isManualMode, setIsManualMode] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const newRates = {};
    countries.forEach(country => {
      newRates[country.currency_code] = parseFloat(country.exchange_rate_to_usd || '1').toFixed(4);
    });
    setRates(newRates);
    setOriginalRates({ ...newRates });
  }, [countries]);

  const handleRateChange = (currency, value) => {
    const newRates = { ...rates, [currency]: parseFloat(value).toFixed(4) };
    setRates(newRates);
    if (onRatesChange) onRatesChange(newRates);
  };

  const fetchRatesFromApi = async () => {
    if (!countries.length) return;

    setIsFetching(true);
    try {
      const response = await fetch(route('settings.currency.fetch'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify({
          currencies: countries.map(c => c.currency_code),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const newRates = Object.fromEntries(
          Object.entries(data).map(([k, v]) => [k, parseFloat(v).toFixed(4)])
        );
        setRates(newRates);
        setOriginalRates({ ...newRates });
        setIsManualMode(false);
        toast.success('Tasas actualizadas desde CurrencyFreaks');
        if (onRatesChange) onRatesChange(newRates);
      } else {
        toast.warning('Usando tasas manuales (API no disponible)');
      }
    } catch (e) {
      toast.error('Error al conectar con el servidor');
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  };

  const cancelManualEdit = () => {
    setRates({ ...originalRates });
    setIsManualMode(false);
    if (onRatesChange) onRatesChange({ ...originalRates });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    router.put(
      route('settings.currencyrates.update'),
      { rates: rates },
      {
        onFinish: () => setIsSubmitting(false),
        onSuccess: () => {
          toast.success('Tasas de cambio guardadas');
          setOriginalRates({ ...rates });
        },
        onError: (errors) => {
          toast.error('Error al guardar las tasas');
          console.error(errors);
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ✅ Sección completa: título, controles, tasas y botón de guardar */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Tasas de Cambio</h2>
            {operatingCountry ? (
              <p className="text-sm text-gray-600 mt-1">
                1 {baseCurrencyCode} = {activeRate.toFixed(2)} {operatingCountry.currency_symbol}
              </p>
            ) : (
              <p className="text-sm text-gray-600 mt-1">
                1 {baseCurrencyCode} = ? [Moneda Local]
              </p>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={fetchRatesFromApi}
              disabled={isFetching}
              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
              Actualizar desde API
            </button>
            {isManualMode ? (
              <button
                type="button"
                onClick={cancelManualEdit}
                className="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar edición
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsManualMode(true)}
                className="inline-flex items-center px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Editar manualmente
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto mt-6">
          {countries.map(country => (
            <div key={`${country.iso2}-${country.currency_code}`} className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900 mb-1">
                {country.name} - {country.currency_code} ({country.currency_symbol})
              </div>
              <input
                type="number"
                step="0.0001"
                min="0"
                value={rates[country.currency_code] || '1.0000'}
                onChange={(e) => handleRateChange(country.currency_code, e.target.value)}
                readOnly={!isManualMode}
                className={`w-full px-2 py-1 text-sm border ${
                  isManualMode ? 'border-gray-300 rounded focus:ring-2 focus:ring-emerald-500' : 'border-transparent bg-gray-100 rounded'
                }`}
              />
              <div className="text-xs text-gray-500 mt-1">
                1 {baseCurrencyCode} = {rates[country.currency_code] || '1.0000'} {country.currency_code}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Botón de guardar dentro del mismo contenedor */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            >
              <Save className="h-5 w-5 mr-2" />
              {isSubmitting ? 'Guardando...' : 'Guardar Configuración'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CountryExchangeRates;
