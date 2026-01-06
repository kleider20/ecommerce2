// resources/js/Pages/SuperAdmin/Settings/CurrencyEdit.jsx
import React, { useState } from 'react';
import AutoLayoutResolver from '@/Layouts/AutoLayoutResolver';
import BaseCurrencySelector from './Components/BaseCurrencySelector';
import CountryExchangeRates from './Components/CountryExchangeRates';

const CurrencyEdit = ({ settings, countries }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(
    settings.base_currency_code || 'USD'
  );

  return (
    <AutoLayoutResolver>
      <div className="mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Configuración de Moneda</h1>
          <p className="text-gray-600">
            Define la moneda base del sistema y gestiona las tasas de cambio.
          </p>
        </div>

        {/* Formulario + Vista previa */}
        <BaseCurrencySelector
          selectedCurrency={selectedCurrency}
          countries={countries}
          onCurrencyChange={setSelectedCurrency}
        />

        {/* Tasas de cambio (separado) */}
        <div className="mt-8">
          <CountryExchangeRates
            countries={countries}
            baseCurrencyCode={settings?.base_currency_code || 'USD'}
            operatingCountryIso2={settings?.operating_country_iso2 || 'VE'}
          />
        </div>
      </div>
    </AutoLayoutResolver>
  );
};

export default CurrencyEdit;
