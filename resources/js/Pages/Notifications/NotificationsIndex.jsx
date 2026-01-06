// // resources/js/Pages/Users/Notifications/NotificationsIndex.jsx
// import React, { useState } from 'react';
// import { Head, router } from '@inertiajs/react';
// import { Bell, AlertCircle, Package, Gift, Star, User, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
// import { toast } from 'react-toastify';
// import PageWrapper from '@/Layouts/PageWrapper';

// const NotificationsIndex = ({ notifications }) => {
//   const [notificationsList, setNotificationsList] = useState(notifications.data);
//   const [unreadCount, setUnreadCount] = useState(notifications.data.filter(n => !n.read).length);

//   const markAllAsRead = () => {
//     router.post('/notifications/mark-all-read', {
//       onSuccess: () => {
//         setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
//         setUnreadCount(0);
//         toast.success('Todas las notificaciones marcadas como leídas');
//       }
//     });
//   };

//   const deleteNotification = (id) => {
//     router.delete(`/notifications/${id}`, {
//       onSuccess: () => {
//         setNotificationsList(prev => prev.filter(n => n.id !== id));
//         setUnreadCount(prev => Math.max(0, prev - 1));
//         toast.success('Notificación eliminada');
//       }
//     });
//   };

//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case 'order': return Package;
//       case 'promotion': return Gift;
//       case 'review': return Star;
//       case 'account': return User;
//       default: return Bell;
//     }
//   };

//   const getNotificationColor = (type) => {
//     switch (type) {
//       case 'order': return 'bg-green-100 text-green-600';
//       case 'promotion': return 'bg-purple-100 text-purple-600';
//       case 'review': return 'bg-yellow-100 text-yellow-600';
//       case 'account': return 'bg-blue-100 text-blue-600';
//       default: return 'bg-gray-100 text-gray-600';
//     }
//   };

//   return (
//     <PageWrapper>
//       <Head title="Notificaciones" />
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button onClick={() => router.visit('/dashboard')} className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <h1 className="text-2xl font-bold text-gray-900">Notificaciones</h1>
//           </div>
//           {unreadCount > 0 && (
//             <button onClick={markAllAsRead} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//               Marcar todas como leídas
//             </button>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="bg-white rounded-lg p-4 border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div><p className="text-sm text-gray-600">Total</p><p className="text-lg font-bold text-gray-900">{notifications.data.length}</p></div>
//               <Bell className="w-6 h-6 text-gray-400" />
//             </div>
//           </div>
//           <div className="bg-white rounded-lg p-4 border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div><p className="text-sm text-gray-600">No leídas</p><p className="text-lg font-bold text-gray-900">{unreadCount}</p></div>
//               <AlertCircle className="w-6 h-6 text-red-400" />
//             </div>
//           </div>
//           <div className="bg-white rounded-lg p-4 border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div><p className="text-sm text-gray-600">Pedidos</p><p className="text-lg font-bold text-gray-900">{notifications.data.filter(n => n.type === 'order').length}</p></div>
//               <Package className="w-6 h-6 text-green-400" />
//             </div>
//           </div>
//           <div className="bg-white rounded-lg p-4 border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div><p className="text-sm text-gray-600">Promociones</p><p className="text-lg font-bold text-gray-900">{notifications.data.filter(n => n.type === 'promotion').length}</p></div>
//               <Gift className="w-6 h-6 text-purple-400" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//           {notifications.data.length > 0 ? (
//             notifications.data.map(notification => {
//               const IconComponent = getNotificationIcon(notification.type);
//               const colorClass = getNotificationColor(notification.type);
//               return (
//                 <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
//                   onClick={() => router.visit(`/notifications/${notification.id}`)}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
//                       <IconComponent className="w-5 h-5" />
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm text-gray-900 font-medium">{notification.message}</p>
//                       <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                     </div>
//                     <button onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
//                       className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded transition-colors"
//                     >
//                       <XCircle className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center py-12">
//               <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes notificaciones</h3>
//               <p className="text-gray-600">Recibirás notificaciones sobre tus pedidos, promociones y más.</p>
//             </div>
//           )}
//         </div>
//         <div className="text-center text-sm text-gray-500">
//           <p>Todas las notificaciones se guardan por 30 días</p>
//         </div>
//       </div>
//     </PageWrapper>
//   );
// };

// export default NotificationsIndex;


// resources/js/Pages/Notifications/NotificationsIndex.jsx
import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Bell, AlertCircle, Package, Gift, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import PageWrapper from '@/Layouts/AutoLayoutResolver';

const NotificationsIndex = ({ notifications }) => {
  const [notificationsList, setNotificationsList] = useState(notifications.data);
  const [unreadCount, setUnreadCount] = useState(
    notifications.data.filter(n => !n.read).length
  );

  const deleteNotification = (id) => {
    router.delete(`/notifications/${id}`, {
      onSuccess: () => {
        setNotificationsList(prev => prev.filter(n => n.id !== id));
        setUnreadCount(prev => Math.max(0, prev - 1));
        toast.success('Notificación eliminada');
      }
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case 'order': return <Package className="w-5 h-5" />;
      case 'promotion': return <Gift className="w-5 h-5" />;
      case 'review': return <Star className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'order': return 'bg-green-100 text-green-600';
      case 'promotion': return 'bg-purple-100 text-purple-600';
      case 'review': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <AutoLayoutResolver>
      <Head title="Notificaciones" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Notificaciones</h1>
          {unreadCount > 0 && (
            <button
              onClick={() => router.post('/notifications/mark-all-read')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Marcar todas como leídas
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total" value={notifications.data.length} icon={Bell} />
          <StatCard title="No leídas" value={unreadCount} icon={AlertCircle} color="text-red-400" />
          <StatCard title="Pedidos" value={notifications.data.filter(n => n.type === 'order').length} icon={Package} color="text-green-400" />
          <StatCard title="Promociones" value={notifications.data.filter(n => n.type === 'promotion').length} icon={Gift} color="text-purple-400" />
        </div>

        {/* Lista */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {notificationsList.length ? (
            notificationsList.map(notification => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
                onClick={() => router.visit(`/notifications/${notification.id}`)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes notificaciones</h3>
            </div>
          )}
        </div>
      </div>
    </AutoLayoutResolver>
  );
};

const StatCard = ({ title, value, icon: Icon, color = 'text-gray-400' }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
  </div>
);

const XCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default NotificationsIndex;
