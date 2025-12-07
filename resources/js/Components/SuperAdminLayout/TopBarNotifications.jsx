// resources/js/Layouts/SuperAdmin/TopBarNotifications.jsx
import React from 'react';
import { Bell, Building2, Users, CreditCard, TrendingUp } from 'lucide-react';

const recentActivities = [
  { id: 1, type: 'store', message: 'Nueva tienda registrada', time: '2 min', store: 'TechStore México' },
  { id: 2, type: 'user', message: 'Nuevo administrador aprobado', time: '15 min', user: 'Carlos López' },
  { id: 3, type: 'payment', message: 'Comisión procesada', time: '1 hora', amount: '$2,450.99' },
  { id: 4, type: 'review', message: 'Nueva reseña de plataforma', time: '2 horas', rating: 5 }
];

const getIconByType = (type) => {
  switch (type) {
    case 'store': return <Building2 className="h-4 w-4 text-blue-400" />;
    case 'user': return <Users className="h-4 w-4 text-purple-400" />;
    case 'payment': return <CreditCard className="h-4 w-4 text-emerald-400" />;
    case 'review': return <TrendingUp className="h-4 w-4 text-orange-400" />;
    default: return null;
  }
};

const TopBarNotifications = () => {
  return (
    <div className="absolute right-0 mt-3 w-80 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
      <div className="p-4 border-b border-gray-700">
        <h4 className="text-sm font-semibold text-white">Notificaciones del Sistema</h4>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {recentActivities.map((notification) => (
          <div key={notification.id} className="flex items-start p-4 hover:bg-gray-700 border-b border-gray-700 last:border-b-0">
            <div className="flex-shrink-0 mt-0.5">
              {getIconByType(notification.type)}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-white">{notification.message}</p>
              {(notification.store || notification.user || notification.amount) && (
                <p className="text-xs text-gray-400">{notification.store || notification.user || notification.amount}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-700">
        <button className="w-full text-center text-sm text-emerald-400 hover:text-emerald-300 font-medium">Ver todas</button>
      </div>
    </div>
  );
};

export default TopBarNotifications;
