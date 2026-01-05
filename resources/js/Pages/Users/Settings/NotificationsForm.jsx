// resources/js/Pages/User/Settings/NotificationsForm.jsx
import React, { useState } from 'react';
import { Bell, Mail, Phone } from 'lucide-react';

const NotificationsForm = ({ config, onSave }) => {
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
          <Bell className="w-5 h-5" />
          Notificaciones
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
          { field: 'orderNotifications', label: 'Pedidos y envíos', description: 'Recibir actualizaciones sobre tus pedidos' },
          { field: 'promotionNotifications', label: 'Ofertas y promociones', description: 'Recibir ofertas exclusivas y promociones' },
          { field: 'reviewNotifications', label: 'Reseñas y calificaciones', description: 'Notificaciones sobre tus reseñas' },
          { field: 'accountNotifications', label: 'Cuenta y seguridad', description: 'Notificaciones importantes de tu cuenta' }
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
          <h3 className="font-medium text-gray-900 mb-3">Canales de notificación</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { field: 'emailNotifications', label: 'Correo electrónico', icon: Mail, color: 'text-blue-600' },
              { field: 'pushNotifications', label: 'Notificaciones push', icon: Bell, color: 'text-green-600' },
              { field: 'smsNotifications', label: 'SMS', icon: Phone, color: 'text-purple-600' }
            ].map(item => {
              const IconComponent = item.icon;
              return (
                <div key={item.field} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`w-5 h-5 ${item.color}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[item.field]}
                      onChange={() => toggleSetting(item.field)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
};

export default NotificationsForm;
