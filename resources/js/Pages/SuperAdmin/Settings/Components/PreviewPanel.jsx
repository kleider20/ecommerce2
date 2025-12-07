// resources/js/Pages/SuperAdmin/Settings/Components/PreviewPanel.jsx
import React, { useMemo } from 'react';

const PreviewPanel = ({ formData, countries, logoPreview }) => {
  const selectedCountry = useMemo(
    () => countries.find(c => c.iso2 === formData.operating_country_iso2),
    [formData.operating_country_iso2, countries]
  );

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 sticky top-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Vista Previa</h2>

      {(formData.logo_path || logoPreview) && (
        <div className="mb-4 flex justify-center">
          <img
            src={formData.logo_path || logoPreview}
            alt="Logo"
            className="h-12 object-contain"
            onError={() => {}}
          />
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">{formData.site_name}</h3>
        <p className="text-sm text-gray-600 mt-1">
          {selectedCountry ? selectedCountry.name : 'Selecciona un país'}
        </p>
      </div>

      {selectedCountry && (
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <h4 className="font-semibold text-emerald-800 text-center mb-3">Configuración del País</h4>
          <div className="space-y-2">
            <div>
              <span className="text-xs font-medium text-emerald-700">Zona Horaria:</span>
              <p className="text-sm font-medium text-gray-900">{selectedCountry.timezone}</p>
            </div>
            <div>
              <span className="text-xs font-medium text-emerald-700">Idioma:</span>
              <p className="text-sm font-medium text-gray-900">
                {selectedCountry.language_name} ({selectedCountry.locale})
              </p>
            </div>
          </div>
        </div>
      )}

      {formData.maintenance_mode && (
        <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100">
          <h4 className="font-semibold text-red-800 text-center mb-2">Modo Mantenimiento Activo</h4>
          <p className="text-sm text-red-700 text-center">{formData.maintenance_message}</p>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-500 text-center">
        Esta es una vista previa. Los cambios se aplicarán al guardar.
      </div>
    </div>
  );
};

export default PreviewPanel;
