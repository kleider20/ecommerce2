// resources/js/Pages/User/Settings/PrivacyForm.jsx
import React, { useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

const PrivacyForm = ({ config, onSave }) => {
  const [formData, setFormData] = useState({ ...config });

  const toggleSetting = (field) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDeleteAccount = () => {
    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.')) {
      // Lógica para eliminar cuenta
      console.log('Eliminando cuenta...');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacidad
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
          { field: 'publicProfile', label: 'Perfil público', description: 'Permitir que otros usuarios vean tu perfil' },
          { field: 'shareData', label: 'Compartir datos de uso', description: 'Ayuda a mejorar nuestra plataforma' },
          { field: 'marketingEmails', label: 'Correos de marketing', description: 'Recibir emails promocionales' },
          { field: 'thirdPartyCookies', label: 'Cookies de terceros', description: 'Permitir cookies para análisis' }
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

        <div className="pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Eliminar mi cuenta</span>
          </button>
          <p className="text-xs text-gray-600 text-center mt-2">
            Tu cuenta y todos los datos asociados serán eliminados permanentemente
          </p>
        </div>
      </div>
    </form>
  );
};

export default PrivacyForm;
