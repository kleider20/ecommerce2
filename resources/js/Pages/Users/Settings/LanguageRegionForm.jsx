// // resources/js/Pages/User/Settings/LanguageRegionForm.jsx
// import React, { useState } from 'react';
// import { Globe } from 'lucide-react';

// const LanguageRegionForm = ({ config, languages, timezones, currencies, onSave }) => {
//   const [formData, setFormData] = useState({ ...config });

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//           <Globe className="w-5 h-5" />
//           Idioma y Región
//         </h2>
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//         >
//           Guardar cambios
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
//           <select
//             value={formData.language}
//             onChange={(e) => handleChange('language', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             {languages.map(lang => (
//               <option key={lang.code} value={lang.code}>
//                 {lang.flag} {lang.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Zona horaria</label>
//           <select
//             value={formData.timezone}
//             onChange={(e) => handleChange('timezone', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             {timezones.map(tz => (
//               <option key={tz} value={tz}>{tz}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
//           <select
//             value={formData.currency}
//             onChange={(e) => handleChange('currency', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             {currencies.map(curr => (
//               <option key={curr.code} value={curr.code}>
//                 {curr.symbol} {curr.name} ({curr.code})
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Sistema de medidas</label>
//           <select
//             value={formData.measurement}
//             onChange={(e) => handleChange('measurement', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="metric">Métrico (kg, cm)</option>
//             <option value="imperial">Imperial (lb, in)</option>
//           </select>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default LanguageRegionForm;


// import React, { useState } from 'react';
// import { Globe } from 'lucide-react';
// import { usePage } from '@inertiajs/react'; // Importar usePage

// const LanguageRegionForm = ({ onSave }) => {
//   // Extraemos los datos globales que definimos en el middleware
//   const { availableCountries, userConfig } = usePage().props;

//   // Estado inicial seguro
//   const [formData, setFormData] = useState({
//     language: userConfig?.locale || 'es-VE',
//     timezone: 'America/Caracas',
//     currency: userConfig?.currency_code || 'USD',
//     measurement: 'metric'
//   });

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (onSave) onSave(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//           <Globe className="w-5 h-5" />
//           Idioma y Región
//         </h2>
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//         >
//           Guardar cambios
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* IDIOMA BASADO EN PAÍSES DISPONIBLES */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Región / Idioma</label>
//           <select
//             value={formData.language}
//             onChange={(e) => handleChange('language', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             {/* Validamos que availableCountries exista antes del map */}
//             {availableCountries?.map(country => (
//               <option key={country.iso2} value={country.iso2}>
//                  {country.name} ({country.iso2})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* ZONA HORARIA (Hardcoded por ahora para evitar el error) */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Zona horaria</label>
//           <select
//             value={formData.timezone}
//             onChange={(e) => handleChange('timezone', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="America/Caracas">America/Caracas (VET)</option>
//             <option value="America/Bogota">America/Bogota (COT)</option>
//             <option value="UTC">Universal Coordinated Time (UTC)</option>
//           </select>
//         </div>

//         {/* MONEDA (Usando datos de tu tabla countries si los necesitas) */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Moneda de visualización</label>
//           <select
//             value={formData.currency}
//             onChange={(e) => handleChange('currency', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//              <option value="USD">$ Dólar Estadounidense</option>
//              <option value="VES">Bs. Bolívar Venezolano</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Sistema de medidas</label>
//           <select
//             value={formData.measurement}
//             onChange={(e) => handleChange('measurement', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="metric">Métrico (kg, cm)</option>
//             <option value="imperial">Imperial (lb, in)</option>
//           </select>
//         </div>
//       </div>
//     </form>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { usePage } from '@inertiajs/react';

const LanguageRegionForm = ({ onSave }) => {
  const { availableCountries, userConfig } = usePage().props;

  // Estado inicial de todo el formulario
  const [formData, setFormData] = useState({
    region: userConfig?.country_iso2 || 'VE',
    timezone: userConfig?.timezone || 'America/Caracas',
    currency: userConfig?.currency_code || 'USD',
    measurement: 'metric'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 🚀 Lógica para actualizar moneda y timezone al cambiar de país/región
  useEffect(() => {
    // Buscamos el objeto del país seleccionado
    const selectedCountry = availableCountries?.find(
      c => c.iso2 === formData.region
    );

    if (selectedCountry) {
      // Actualizamos los otros campos automáticamente
      setFormData(prev => ({
        ...prev,
        currency: selectedCountry.currency_code,
        timezone: selectedCountry.timezone || prev.timezone,
      }));
    }
  }, [formData.region, availableCountries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  // Función auxiliar para obtener el símbolo de la moneda para mostrar
  const getCurrencySymbol = (currencyCode) => {
    const country = availableCountries?.find(c => c.currency_code === currencyCode);
    return country ? country.currency_symbol : currencyCode;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... Botón de guardar y título ... */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Idioma y Región
        </h2>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Guardar cambios
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SELECTOR DE PAÍS/REGIÓN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">País / Región</label>
          <select
            value={formData.region}
            onChange={(e) => handleChange('region', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {availableCountries?.map(country => (
              <option key={country.iso2} value={country.iso2}>
                 {country.name} ({country.currency_symbol} {country.currency_code})
              </option>
            ))}
          </select>
        </div>

        {/* ZONA HORARIA (Mostrando el valor del país seleccionado, no editable) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Zona horaria</label>
          <select
            value={formData.timezone}
            disabled // Campo deshabilitado
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          >
              <option value={formData.timezone}>{formData.timezone}</option>
          </select>
        </div>

        {/* MONEDA (Mostrando el símbolo y código, no editable) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
          <select
            value={formData.currency}
            disabled // Campo deshabilitado
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          >
              <option value={formData.currency}>
                {getCurrencySymbol(formData.currency)} {formData.currency}
              </option>
          </select>
        </div>

        {/* SISTEMA DE MEDIDAS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sistema de medidas</label>
          <select
            value={formData.measurement}
            onChange={(e) => handleChange('measurement', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="metric">Métrico (kg, cm)</option>
            <option value="imperial">Imperial (lb, in)</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default LanguageRegionForm;
