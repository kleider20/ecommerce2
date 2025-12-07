// resources/js/Pages/SuperAdmin/Settings/Components/GeneralInfoSection.jsx
import React from 'react';
import { Globe, ImageIcon } from 'lucide-react';

const GeneralInfoSection = ({ formData, countries, onChange, onLogoPreview }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <Globe className="h-6 w-6 text-emerald-600" />
        <h2 className="text-xl font-bold text-gray-900">Información Básica</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Sitio *
          </label>
          <input
            type="text"
            name="site_name"
            value={formData.site_name}
            onChange={onChange}
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            País de Operación *
          </label>
          <select
            name="operating_country_iso2"
            value={formData.operating_country_iso2}
            onChange={onChange}
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            required
          >
            {countries.map(country => (
              <option key={country.iso2} value={country.iso2}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <ImageIcon className="h-4 w-4 inline mr-1" />
            URL del Logo
          </label>
          <input
            type="url"
            name="logo_path"
            value={formData.logo_path}
            onChange={(e) => {
              onChange(e);
              onLogoPreview(e.target.value);
            }}
            placeholder="https://ejemplo.com/logo.png"
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
          />
          {formData.logo_path && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Vista previa:</p>
              <img
                src={formData.logo_path}
                alt="Logo"
                className="h-12 object-contain"
                onError={() => onLogoPreview(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoSection;
