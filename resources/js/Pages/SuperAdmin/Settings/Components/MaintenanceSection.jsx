// resources/js/Pages/SuperAdmin/Settings/Components/MaintenanceSection.jsx
import React from 'react';
import { Shield } from 'lucide-react';

const MaintenanceSection = ({ formData, onChange }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="h-6 w-6 text-emerald-600" />
        <h2 className="text-xl font-bold text-gray-900">Modo de Mantenimiento</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="maintenance_mode"
            checked={formData.maintenance_mode}
            onChange={onChange}
            className="h-4 w-4 text-emerald-600 rounded mt-1"
            id="maintenance_mode"
          />
          <div>
            <label htmlFor="maintenance_mode" className="font-medium text-gray-900">
              Activar modo de mantenimiento
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Los visitantes verán un mensaje de mantenimiento.
            </p>
          </div>
        </div>

        {formData.maintenance_mode && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensaje personalizado
            </label>
            <input
              type="text"
              name="maintenance_message"
              value={formData.maintenance_message}
              onChange={onChange}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej: Estamos actualizando..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceSection;
