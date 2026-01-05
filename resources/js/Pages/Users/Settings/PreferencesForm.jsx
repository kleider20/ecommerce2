// resources/js/Pages/User/Settings/PreferencesForm.jsx
import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const PreferencesForm = ({ config, onSave }) => {
  const [formData, setFormData] = useState({ ...config });

  const toggleSetting = (field) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Preferencias
        </h2>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Guardar cambios
        </button>
      </div>

      <div className="space-y-4">
        {[
          { field: 'newsletter', label: 'Boletín informativo', description: 'Recibir actualizaciones semanales' },
          { field: 'productRecommendations', label: 'Recomendaciones de productos', description: 'Basado en tu historial de compras' },
          { field: 'savePaymentInfo', label: 'Guardar información de pago', description: 'Guarda tus métodos de pago para compras futuras' },
          { field: 'autoPlayVideos', label: 'Reproducción automática de videos', description: 'En páginas de productos' },
          { field: 'darkMode', label: 'Modo oscuro', description: 'Interfaz con tema oscuro' }
        ].map(item => (
          <div key={item.field} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{item.label}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData[item.field]}
                onChange={() => toggleSetting(item.field)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </form>
  );
};

export default PreferencesForm;
