// // resources/js/Layouts/2026/Userscomponents/NotificationDropdown.jsx
// import React from 'react';
// import { Package, TrendingUp, Star, Bell } from 'lucide-react';

// const getIcon = (type) => {
//   switch (type) {
//     case 'order': return <Package className="w-4 h-4" />;
//     case 'promotion': return <TrendingUp className="w-4 h-4" />;
//     case 'review': return <Star className="w-4 h-4" />;
//     default: return <Star className="w-4 h-4" />;
//   }
// };

// const getColor = (type) => {
//   switch (type) {
//     case 'order': return 'bg-green-100 text-green-600';
//     case 'promotion': return 'bg-purple-100 text-purple-600';
//     default: return 'bg-blue-100 text-blue-600';
//   }
// };

// const NotificationDropdown = ({ notifications, unreadCount, onMarkAsRead }) => (
//   <div className="relative">
//     <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg relative">
//       <Bell className="w-5 h-5" />
//       {unreadCount > 0 && (
//         <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//           {unreadCount}
//         </span>
//       )}
//     </button>

//     {unreadCount > 0 && (
//       <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
//         <div className="p-4 border-b border-gray-200">
//           <h3 className="font-semibold text-gray-900">Notificaciones</h3>
//         </div>
//         <div className="max-h-64 overflow-y-auto">
//           {notifications.slice(0, 3).map(notification => (
//             <div
//               key={notification.id}
//               className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
//                 !notification.read ? 'bg-blue-50' : ''
//               }`}
//               onClick={() => onMarkAsRead(notification.id)}
//             >
//               <div className="flex items-start gap-3">
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColor(notification.type)}`}>
//                   {getIcon(notification.type)}
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm text-gray-900">{notification.message}</p>
//                   <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="p-3 border-t border-gray-200">
//           <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
//             Ver todas las notificaciones
//           </button>
//         </div>
//       </div>
//     )}
//   </div>
// );

// export default NotificationDropdown;


// resources/js/Layouts/2026/Users/components/NotificationDropdown.jsx
import React from 'react';
import { Package, TrendingUp, Star, Bell } from 'lucide-react';
import { Link } from '@inertiajs/react';

const getIcon = (type) => {
  switch (type) {
    case 'order': return <Package className="w-4 h-4" />;
    case 'promotion': return <TrendingUp className="w-4 h-4" />;
    case 'review': return <Star className="w-4 h-4" />;
    default: return <Star className="w-4 h-4" />;
  }
};

const getColor = (type) => {
  switch (type) {
    case 'order': return 'bg-green-100 text-green-600';
    case 'promotion': return 'bg-purple-100 text-purple-600';
    default: return 'bg-blue-100 text-blue-600';
  }
};

const NotificationDropdown = ({
  notifications,
  unreadCount,
  markAsRead,
  isOpen,
  onToggle
}) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg relative"
    >
      <Bell className="w-5 h-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>

    {isOpen && (
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Notificaciones</h3>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {notifications.slice(0, 3).map(notification => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
              onClick={() => markAsRead(notification.id, notification.action_url)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-200">
          <Link
            href="/notifications"
            className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium block"
          >
            Ver todas las notificaciones
          </Link>
        </div>
      </div>
    )}
  </div>
);

export default NotificationDropdown;
