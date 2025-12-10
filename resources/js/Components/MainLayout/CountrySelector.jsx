// resources/js/Components/CountrySelector.jsx
import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
import { usePage, router } from '@inertiajs/react';

export default function CountrySelector() {
  const { props } = usePage();
  const { globalConfig, availableCountries = [] } = props;

  const primeCountries = availableCountries.map(country => ({
    name: country.name,
    code: country.iso2,
  }));

  const currentCountryCode = globalConfig?.country_code || 'VE';
  const selectedCountry = primeCountries.find(c => c.code === currentCountryCode) || null;

  /* const handleCountryChange = (e) => {
    if (e.value) {
      router.post('/set-country', { country_code: e.value.code });
    }
  }; */

  const handleCountryChange = (e) => {
    if (e.value?.code) {
      router.post('/set-country', { country_code: e.value.code });
    }
  };

  const countryTemplate = (option) => {
    if (!option) return null;
    return (
      <div className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <span className={`fi fi-${option.code.toLowerCase()} fis mr-2`} style={{ fontSize: '1.1rem' }} />
        <span>{option.name}</span>
      </div>
    );
  };

  const valueTemplate = (option) => {
    if (!option) return <span className="text-gray-500">Seleccionar país</span>;
    return (
      <div className="flex items-center">
        <span className={`fi fi-${option.code.toLowerCase()} fis mr-2`} style={{ fontSize: '1.1rem' }} />
        <span className="text-gray-900">{option.name}</span>
      </div>
    );
  };

  const panelFooterTemplate = () => {
    return (
      <div className="px-3 py-2 text-xs text-gray-600 border-t border-gray-200">
        {selectedCountry ? (
          <span><b>{selectedCountry.name}</b> seleccionado</span>
        ) : (
          'Ningún país seleccionado'
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xs">
        <Dropdown
          value={selectedCountry}
          onChange={handleCountryChange}
          options={primeCountries}
          optionLabel="name"
          valueTemplate={valueTemplate}
          itemTemplate={countryTemplate}
          panelFooterTemplate={panelFooterTemplate}
          className="w-full"
          panelClassName="border border-gray-300 rounded-lg shadow-lg p-1 bg-white max-h-60"
          inputRef={(el) => {
            if (el) {
              el.className = "w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm";
            }
          }}
          dropdownIcon={(opts) => {
            return opts.overlayVisible ? (
              <ChevronRightIcon {...opts.iconProps} />
            ) : (
              <ChevronDownIcon {...opts.iconProps} />
            );
          }}
        />
      </div>
    </div>
  );
}
