// resources/js/Pages/User/Settings/SecurityForm.jsx
import React, { useState } from 'react';
import { Lock, Key, Eye } from 'lucide-react';

const SecurityForm = ({ config, onSave }) => {
  const [formData, setFormData] = useState({ ...config });

  const toggleSetting = (field) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChangePassword = () => {
    // Lógica para cambiar contraseña
    console.log('Cambiando contraseña...');
  };

  const viewActiveSessions = () => {
    // Lógica para ver sesiones activas
    console.log('Viendo sesiones activas...');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Seguridad
        </h2>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Guardar cambios
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Autenticación de dos factores</p>
            <p className="text-sm text-gray-600">Añade una capa extra de seguridad</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.twoFactorEnabled}
              onChange={() => toggleSetting('twoFactorEnabled')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-900">Último cambio de contraseña</p>
            <p className="text-sm text-gray-600">{formData.lastPasswordChange}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Sesiones activas</p>
            <p className="text-sm text-gray-600">{formData.activeSessions} dispositivos</p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleChangePassword}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Key className="w-4 h-4" />
            <span>Cambiar contraseña</span>
          </button>
          <button
            type="button"
            onClick={viewActiveSessions}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Ver sesiones activas</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SecurityForm;
