// // resources/js/Components/Notifications/GlobalNotifications.jsx
// import React, { useState, useEffect } from 'react';
// import { Bell } from 'lucide-react';
// import { usePage, router } from '@inertiajs/react';
// import { toast } from 'react-toastify';

// const GlobalNotifications = () => {
//   const { props } = usePage();
//   const { auth, unreadNotificationsCount = 0, notifications: notificationsProp = [] } = props;

//   // Solo mostrar si el usuario está autenticado
//   if (!auth?.user) return null;

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // ✅ EXTRAER EL ARRAY DE NOTIFICACIONES CORRECTAMENTE
//   let notificationsArray = [];
//   if (Array.isArray(notificationsProp)) {
//     notificationsArray = notificationsProp;
//   } else if (
//     notificationsProp &&
//     typeof notificationsProp === 'object' &&
//     Array.isArray(notificationsProp.data)
//   ) {
//     notificationsArray = notificationsProp.data;
//   }

//   // 👇 Mostrar toast para notificaciones (solo una vez por sesión)
//   const showNotificationToast = (notification) => {
//     const toastKey = `toast_${notification.id}`;
//     if (sessionStorage.getItem(toastKey)) return;

//     sessionStorage.setItem(toastKey, 'shown');
//     setTimeout(() => sessionStorage.removeItem(toastKey), 10000);

//     toast.info(
//       <div>
//         <div className="font-medium">{notification.message}</div>
//         <div className="text-xs opacity-80">{notification.time}</div>
//       </div>,
//       {
//         autoClose: 8000,
//         onClick: () => {
//           if (notification.action_url) {
//             router.visit(notification.action_url);
//           } else {
//             router.visit(`/notifications/${notification.id}`);
//           }
//         },
//         style: { cursor: 'pointer' }
//       }
//     );
//   };

//   // 👇 Mostrar toasts al cargar la página (solo para no leídas)
//   useEffect(() => {
//     const unread = notificationsArray.filter(n => !n.read);
//     if (unread.length > 0) {
//       unread.forEach(notification => {
//         showNotificationToast(notification);
//       });
//     }
//   }, []);

//   // 👇 Escuchar notificaciones en tiempo real (Pusher)
//   useEffect(() => {
//     const userId = auth.user.id;
//     const channel = window.Echo.private(`notifications.${userId}`)
//       .listen('NotificationCreated', (e) => {
//         showNotificationToast(e);
//       });

//     return () => {
//       if (window.Echo) {
//         window.Echo.leave(`notifications.${userId}`);
//       }
//     };
//   }, [auth.user.id]);

// //   // 👇 Marcar como leída y redirigir
// //   const handleNotificationClick = async (notification) => {
// //     try {
// //       await fetch(`/notifications/${notification.id}/read`, {
// //         method: 'POST',
// //         headers: {
// //           'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
// //           'Content-Type': 'application/json',
// //         }
// //       });

// //       if (notification.action_url) {
// //         router.visit(notification.action_url);
// //       } else {
// //         router.visit(`/notifications/${notification.id}`);
// //       }
// //     } catch (error) {
// //       console.error('Error al procesar notificación:', error);
// //     }
// //   };

// const handleNotificationClick = async (notification) => {
//     if (!notification || !notification.id) {
//         console.error('Notificación sin ID:', notification);
//         return;
//     }

//     try {
//         // Marcar como leída
//         await fetch(`/notifications/${notification.id}/read`, {
//             method: 'POST',
//             headers: {
//                 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
//                 'Content-Type': 'application/json',
//             }
//         });

//         // 👉 SIEMPRE redirigir al detalle de la notificación
//         router.visit(`/notifications/${notification.id}`);
//     } catch (error) {
//         console.error('Error al procesar notificación:', error);
//     }
// };

//   // 👇 Cerrar dropdown al hacer clic fuera
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (!e.target.closest('.notifications-dropdown')) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, []);

//   // 👇 Helper para iconos por tipo
//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case 'order':
//         return <div className="w-4 h-4 bg-green-500 rounded-full" />;
//       case 'promotion':
//         return <div className="w-4 h-4 bg-purple-500 rounded-full" />;
//       default:
//         return <div className="w-4 h-4 bg-blue-500 rounded-full" />;
//     }
//   };

//   return (
//     <div className="relative notifications-dropdown">
//       <button
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg relative"
//       >
//         <Bell className="w-5 h-5" />
//         {unreadNotificationsCount > 0 && (
//           <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//             {unreadNotificationsCount}
//           </span>
//         )}
//       </button>

//       {isDropdownOpen && (
//         <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
//           <div className="p-4 border-b border-gray-200">
//             <h3 className="font-semibold text-gray-900">Notificaciones</h3>
//           </div>
//           <div className="max-h-64 overflow-y-auto">
//             {notificationsArray.length > 0 ? (
//               notificationsArray.slice(0, 3).map(notification => (
//                 <div
//                   key={notification.id}
//                   className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
//                     !notification.read ? 'bg-blue-50' : ''
//                   }`}
//                   onClick={() => handleNotificationClick(notification)}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className="w-8 h-8 rounded-full flex items-center justify-center">
//                       {getNotificationIcon(notification.type)}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm text-gray-900">{notification.message}</p>
//                       <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="p-4 text-center text-gray-500">
//                 No tienes notificaciones nuevas
//               </div>
//             )}
//           </div>
//           <div className="p-3 border-t border-gray-200">
//             <button
//               onClick={() => router.visit('/notifications')}
//               className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
//             >
//               Ver todas las notificaciones
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GlobalNotifications;


// // resources/js/Components/Notifications/GlobalNotifications.jsx
// import React, { useState, useEffect } from 'react';
// import { Bell } from 'lucide-react';
// import { usePage, router } from '@inertiajs/react';
// import { toast } from 'react-toastify';

// const GlobalNotifications = () => {
//   const { props } = usePage();
//   const { auth, unreadNotificationsCount = 0, notifications: notificationsProp = [] } = props;

//   if (!auth?.user) return null;

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // ✅ Manejar formato de notificaciones (array directo o respuesta paginada)
//   const notificationsArray = Array.isArray(notificationsProp)
//     ? notificationsProp
//     : (notificationsProp?.data || []);

//   // 👇 Mostrar toast (solo una vez por sesión)
//   const showNotificationToast = (notification) => {
//     if (!notification?.id) return;

//     const toastKey = `toast_${notification.id}`;
//     if (sessionStorage.getItem(toastKey)) return;

//     sessionStorage.setItem(toastKey, '1');
//     setTimeout(() => sessionStorage.removeItem(toastKey), 10000);

//     toast.info(
//       <div>
//         <div className="font-medium">{notification.message}</div>
//         <div className="text-xs opacity-80">{notification.time}</div>
//       </div>,
//       {
//         autoClose: 8000,
//         onClick: () => router.visit(`/notifications/${notification.id}`),
//         style: { cursor: 'pointer' }
//       }
//     );
//   };

//   // 👇 Mostrar toasts al cargar
//   useEffect(() => {
//     notificationsArray
//       .filter(n => !n.read)
//       .forEach(showNotificationToast);
//   }, []);

//   // 👇 Escuchar notificaciones en tiempo real
//   useEffect(() => {
//     const channel = window.Echo?.private(`notifications.${auth.user.id}`)
//       ?.listen('NotificationCreated', showNotificationToast);

//     return () => {
//       if (window.Echo) {
//         window.Echo.leave(`notifications.${auth.user.id}`);
//       }
//     };
//   }, [auth.user.id]);

//   // 👇 Marcar como leída y redirigir
//   const handleNotificationClick = async (notification) => {
//     if (!notification?.id) return;

//     try {
//       await fetch(`/notifications/${notification.id}/read`, {
//         method: 'POST',
//         headers: {
//           'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
//         }
//       });
//       router.visit(`/notifications/${notification.id}`);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   // 👇 Cerrar dropdown
//   useEffect(() => {
//     const close = (e) => !e.target.closest('.notifications-dropdown') && setIsDropdownOpen(false);
//     document.addEventListener('click', close);
//     return () => document.removeEventListener('click', close);
//   }, []);

//   const getIcon = (type) => {
//     const colors = { order: 'bg-green-500', promotion: 'bg-purple-500', default: 'bg-blue-500' };
//     const color = colors[type] || colors.default;
//     return <div className={`w-4 h-4 ${color} rounded-full`} />;
//   };

//   return (
//     <div className="relative notifications-dropdown">
//       <button
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg relative"
//       >
//         <Bell className="w-5 h-5" />
//         {/* {unreadNotificationsCount > 0 && (
//           <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full" />
//         )} */}
//         {unreadNotificationsCount > 0 && (
//         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
//             {unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}
//         </span>
//         )}
//       </button>

//       {isDropdownOpen && (
//         <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
//           <div className="p-4 border-b border-gray-200">
//             <h3 className="font-semibold text-gray-900">Notificaciones</h3>
//           </div>
//           <div className="max-h-64 overflow-y-auto">
//             {notificationsArray.length ? (
//               notificationsArray.slice(0, 3).map(notification => (
//                 <div
//                   key={notification.id}
//                   className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
//                     !notification.read ? 'bg-blue-50' : ''
//                   }`}
//                   onClick={() => handleNotificationClick(notification)}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className="w-8 h-8 rounded-full flex items-center justify-center">
//                       {getIcon(notification.type)}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm text-gray-900">{notification.message}</p>
//                       <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="p-4 text-center text-gray-500">
//                 No tienes notificaciones nuevas
//               </div>
//             )}
//           </div>
//           <div className="p-3 border-t border-gray-200">
//             <button
//               onClick={() => router.visit('/notifications')}
//               className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
//             >
//               Ver todas las notificaciones
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GlobalNotifications;



// // resources/js/Components/Notifications/GlobalNotifications.jsx
// import React, { useState, useEffect } from 'react';
// import { Bell } from 'lucide-react';
// import { usePage, router } from '@inertiajs/react';
// import { toast } from 'react-toastify';

// const GlobalNotifications = () => {
//   const { props } = usePage();
//   const { auth, unreadNotificationsCount: initialUnreadCount = 0, notifications: notificationsProp = [] } = props;

//   if (!auth?.user) return null;

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [notificationsArray, setNotificationsArray] = useState([]);
//   const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(initialUnreadCount);

//   // Inicializar notificaciones
//   useEffect(() => {
//     const notifications = Array.isArray(notificationsProp)
//       ? notificationsProp
//       : (notificationsProp?.data || []);
//     setNotificationsArray(notifications);
//     setUnreadNotificationsCount(notifications.filter(n => !n.read).length);
//   }, [notificationsProp]);

//   // 👇 EMITIR EVENTO CUANDO SE LEE UNA NOTIFICACIÓN
//   const emitNotificationRead = (notificationId) => {
//     window.dispatchEvent(new CustomEvent('notification:read', {
//       detail: { notificationId }
//     }));
//   };

//   // 👇 ESCUCHAR EVENTOS GLOBALES DE NOTIFICACIONES LEÍDAS
//   useEffect(() => {
//     const handleNotificationRead = (event) => {
//       const { notificationId } = event.detail;
//       setNotificationsArray(prev =>
//         prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
//       );
//       setUnreadNotificationsCount(prev => Math.max(0, prev - 1));
//     };

//     window.addEventListener('notification:read', handleNotificationRead);
//     return () => window.removeEventListener('notification:read', handleNotificationRead);
//   }, []);

//   const showNotificationToast = (notification) => {
//     if (!notification?.id) return;

//     const toastKey = `toast_${notification.id}`;
//     if (sessionStorage.getItem(toastKey)) return;

//     sessionStorage.setItem(toastKey, '1');
//     setTimeout(() => sessionStorage.removeItem(toastKey), 10000);

//     toast.info(
//       <div>
//         <div className="font-medium">{notification.message}</div>
//         <div className="text-xs opacity-80">{notification.time}</div>
//       </div>,
//       {
//         autoClose: 8000,
//         onClick: () => router.visit(`/notifications/${notification.id}`),
//         style: { cursor: 'pointer' }
//       }
//     );
//   };

//   useEffect(() => {
//     notificationsArray
//       .filter(n => !n.read)
//       .forEach(showNotificationToast);
//   }, [notificationsArray]);

//   useEffect(() => {
//     const channel = window.Echo?.private(`notifications.${auth.user.id}`)
//       ?.listen('NotificationCreated', (notification) => {
//         // Añadir nueva notificación al principio
//         setNotificationsArray(prev => [notification, ...prev]);
//         setUnreadNotificationsCount(prev => prev + 1);
//         showNotificationToast(notification);
//       });

//     return () => {
//       if (window.Echo) {
//         window.Echo.leave(`notifications.${auth.user.id}`);
//       }
//     };
//   }, [auth.user.id]);

//   const handleNotificationClick = async (notification) => {
//     if (!notification?.id) return;

//     try {
//       await fetch(`/notifications/${notification.id}/read`, {
//         method: 'POST',
//         headers: {
//           'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
//         }
//       });

//       // 👇 ACTUALIZAR ESTADO LOCAL Y EMITIR EVENTO GLOBAL
//       setNotificationsArray(prev =>
//         prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
//       );
//       setUnreadNotificationsCount(prev => Math.max(0, prev - 1));

//       emitNotificationRead(notification.id);
//       router.visit(`/notifications/${notification.id}`);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   useEffect(() => {
//     const close = (e) => !e.target.closest('.notifications-dropdown') && setIsDropdownOpen(false);
//     document.addEventListener('click', close);
//     return () => document.removeEventListener('click', close);
//   }, []);

//   const getIcon = (type) => {
//     const colors = { order: 'bg-green-500', promotion: 'bg-purple-500', default: 'bg-blue-500' };
//     const color = colors[type] || colors.default;
//     return <div className={`w-4 h-4 ${color} rounded-full`} />;
//   };

//   return (
//     <div className="relative notifications-dropdown">
//       <button
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg relative"
//       >
//         <Bell className="w-5 h-5" />
//         {unreadNotificationsCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
//             {unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}
//           </span>
//         )}
//       </button>

//       {isDropdownOpen && (
//         <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
//           <div className="p-4 border-b border-gray-200">
//             <h3 className="font-semibold text-gray-900">Notificaciones</h3>
//           </div>
//           <div className="max-h-64 overflow-y-auto">
//             {notificationsArray.length ? (
//               notificationsArray.slice(0, 3).map(notification => (
//                 <div
//                   key={notification.id}
//                   className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
//                     !notification.read ? 'bg-blue-50' : ''
//                   }`}
//                   onClick={() => handleNotificationClick(notification)}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className="w-8 h-8 rounded-full flex items-center justify-center">
//                       {getIcon(notification.type)}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm text-gray-900">{notification.message}</p>
//                       <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="p-4 text-center text-gray-500">
//                 No tienes notificaciones nuevas
//               </div>
//             )}
//           </div>
//           <div className="p-3 border-t border-gray-200">
//             <button
//               onClick={() => router.visit('/notifications')}
//               className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
//             >
//               Ver todas las notificaciones
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GlobalNotifications;


// // resources/js/Components/Notifications/GlobalNotifications.jsx
// import React, { useState, useEffect } from 'react';
// import { Bell } from 'lucide-react';
// import { usePage, router } from '@inertiajs/react';
// import { toast } from 'react-toastify';

// const GlobalNotifications = () => {
//   const { props } = usePage();
//   // ✅ NUEVOS NOMBRES DE PROPS
//   const { auth, unreadGlobalNotificationsCount: initialUnreadCount = 0, globalNotifications: notificationsProp = [] } = props;

//   if (!auth?.user) return null;

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [notificationsArray, setNotificationsArray] = useState([]);
//   const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(initialUnreadCount);

//   // Inicializar notificaciones
//   useEffect(() => {
//     const notifications = Array.isArray(notificationsProp)
//       ? notificationsProp
//       : (notificationsProp?.data || []);
//     setNotificationsArray(notifications);
//     setUnreadNotificationsCount(notifications.filter(n => !n.read).length);
//   }, [notificationsProp]);

//   // 👇 EMITIR EVENTO CUANDO SE LEE UNA NOTIFICACIÓN
//   const emitNotificationRead = (notificationId) => {
//     window.dispatchEvent(new CustomEvent('notification:read', {
//       detail: { notificationId }
//     }));
//   };

//   // 👇 ESCUCHAR EVENTOS GLOBALES DE NOTIFICACIONES LEÍDAS
//   useEffect(() => {
//     const handleNotificationRead = (event) => {
//       const { notificationId } = event.detail;
//       setNotificationsArray(prev =>
//         prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
//       );
//       setUnreadNotificationsCount(prev => Math.max(0, prev - 1));
//     };

//     window.addEventListener('notification:read', handleNotificationRead);
//     return () => window.removeEventListener('notification:read', handleNotificationRead);
//   }, []);

//   const showNotificationToast = (notification) => {
//     if (!notification?.id) return;

//     const toastKey = `toast_${notification.id}`;
//     if (sessionStorage.getItem(toastKey)) return;

//     sessionStorage.setItem(toastKey, '1');
//     setTimeout(() => sessionStorage.removeItem(toastKey), 10000);

//     toast.info(
//       <div>
//         <div className="font-medium">{notification.message}</div>
//         <div className="text-xs opacity-80">{notification.time}</div>
//       </div>,
//       {
//         autoClose: 8000,
//         onClick: () => router.visit(`/notifications/${notification.id}`),
//         style: { cursor: 'pointer' }
//       }
//     );
//   };

//   useEffect(() => {
//     notificationsArray
//       .filter(n => !n.read)
//       .forEach(showNotificationToast);
//   }, [notificationsArray]);

//   useEffect(() => {
//     const channel = window.Echo?.private(`notifications.${auth.user.id}`)
//       ?.listen('NotificationCreated', (notification) => {
//         setNotificationsArray(prev => [notification, ...prev]);
//         setUnreadNotificationsCount(prev => prev + 1);
//         showNotificationToast(notification);
//       });

//     return () => {
//       if (window.Echo) {
//         window.Echo.leave(`notifications.${auth.user.id}`);
//       }
//     };
//   }, [auth.user.id]);

//   const handleNotificationClick = async (notification) => {
//     if (!notification?.id) return;

//     try {
//       await fetch(`/notifications/${notification.id}/read`, {
//         method: 'POST',
//         headers: {
//           'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
//         }
//       });

//       setNotificationsArray(prev =>
//         prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
//       );
//       setUnreadNotificationsCount(prev => Math.max(0, prev - 1));

//       emitNotificationRead(notification.id);
//       router.visit(`/notifications/${notification.id}`);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   useEffect(() => {
//     const close = (e) => !e.target.closest('.notifications-dropdown') && setIsDropdownOpen(false);
//     document.addEventListener('click', close);
//     return () => document.removeEventListener('click', close);
//   }, []);

//   const getIcon = (type) => {
//     const colors = { order: 'bg-green-500', promotion: 'bg-purple-500', default: 'bg-blue-500' };
//     const color = colors[type] || colors.default;
//     return <div className={`w-4 h-4 ${color} rounded-full`} />;
//   };

//   return (
//     <div className="relative notifications-dropdown">
//       <button
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//         className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg relative"
//       >
//         <Bell className="w-5 h-5" />
//         {unreadNotificationsCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
//             {unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}
//           </span>
//         )}
//       </button>

//       {isDropdownOpen && (
//         <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
//           <div className="p-4 border-b border-gray-200">
//             <h3 className="font-semibold text-gray-900">Notificaciones</h3>
//           </div>
//           <div className="max-h-64 overflow-y-auto">
//             {notificationsArray.length ? (
//               notificationsArray.slice(0, 3).map(notification => (
//                 <div
//                   key={notification.id}
//                   className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
//                     !notification.read ? 'bg-blue-50' : ''
//                   }`}
//                   onClick={() => handleNotificationClick(notification)}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className="w-8 h-8 rounded-full flex items-center justify-center">
//                       {getIcon(notification.type)}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-sm text-gray-900">{notification.message}</p>
//                       <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="p-4 text-center text-gray-500">
//                 No tienes notificaciones nuevas
//               </div>
//             )}
//           </div>
//           <div className="p-3 border-t border-gray-200">
//             <button
//               onClick={() => router.visit('/notifications')}
//               className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
//             >
//               Ver todas las notificaciones
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GlobalNotifications;


// resources/js/Components/Notifications/GlobalNotifications.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bell } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';
import { toast } from 'react-toastify';

const GlobalNotifications = () => {
  const { props } = usePage();
  const { auth, unreadGlobalNotificationsCount: initialUnreadCount = 0, globalNotifications: notificationsProp = [] } = props;

  // Evitar render si no hay usuario autenticado
  if (!auth?.user) return null;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationsArray, setNotificationsArray] = useState([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(initialUnreadCount);

  // Evitar renders innecesarios
  const hasInitialized = useRef(false);
  const echoInstance = useRef(null);

  // ✅ Inicializar solo una vez
  useEffect(() => {
    if (!hasInitialized.current && notificationsProp) {
      const notifications = Array.isArray(notificationsProp)
        ? notificationsProp
        : (notificationsProp?.data || []);
      setNotificationsArray(notifications);
      setUnreadNotificationsCount(notifications.filter(n => !n.read).length);
      hasInitialized.current = true;
    }
  }, [notificationsProp]);

  // ✅ Función memoizada para toasts
  const showNotificationToast = useCallback((notification) => {
    if (!notification?.id) return;

    const toastKey = `toast_${notification.id}`;
    if (sessionStorage.getItem(toastKey)) return;

    sessionStorage.setItem(toastKey, '1');
    setTimeout(() => sessionStorage.removeItem(toastKey), 10000);

    toast.info(
      <div>
        <div className="font-medium">{notification.message}</div>
        <div className="text-xs opacity-80">{notification.time}</div>
      </div>,
      {
        autoClose: 8000,
        onClick: () => router.visit(`/notifications/${notification.id}`),
        style: { cursor: 'pointer' }
      }
    );
  }, [router]);

  // ✅ Configurar Pusher solo una vez
  useEffect(() => {
    const userId = auth.user.id;

    // Limpiar instancia anterior si existe
    if (echoInstance.current) {
      try {
        echoInstance.current.leave(`notifications.${userId}`);
      } catch (error) {
        console.warn('Error al limpiar instancia anterior:', error);
      }
    }

    // Crear nueva instancia
    if (window.Echo) {
      try {
        const channel = window.Echo.private(`notifications.${userId}`)
          .listen('NotificationCreated', (notification) => {
            setNotificationsArray(prev => [notification, ...prev]);
            setUnreadNotificationsCount(prev => prev + 1);
            showNotificationToast(notification);
          });
        echoInstance.current = channel;
      } catch (error) {
        console.error('Error al conectar con Pusher:', error);
      }
    }

    return () => {
      if (echoInstance.current && window.Echo) {
        try {
          window.Echo.leave(`notifications.${userId}`);
          echoInstance.current = null;
        } catch (error) {
          console.warn('Error al limpiar Echo:', error);
        }
      }
    };
  }, [auth.user.id, showNotificationToast]);

  // ✅ Mostrar toasts iniciales con retraso
  useEffect(() => {
    if (notificationsArray.length > 0 && hasInitialized.current) {
      const unread = notificationsArray.filter(n => !n.read);
      if (unread.length > 0) {
        const timer = setTimeout(() => {
          unread.forEach(n => showNotificationToast(n));
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [notificationsArray, showNotificationToast]);

  // ✅ Manejar clic en notificación
  const handleNotificationClick = useCallback(async (notification) => {
    if (!notification?.id) return;

    try {
      await fetch(`/notifications/${notification.id}/read`, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        }
      });

      setNotificationsArray(prev =>
        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
      setUnreadNotificationsCount(prev => Math.max(0, prev - 1));

      router.visit(`/notifications/${notification.id}`);
    } catch (error) {
      console.error('Error al procesar notificación:', error);
    }
  }, [router]);

  // ✅ Cerrar dropdown
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.notifications-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  const getIcon = (type) => {
    const colors = { order: 'bg-green-500', promotion: 'bg-purple-500', default: 'bg-blue-500' };
    const color = colors[type] || colors.default;
    return <div className={`w-4 h-4 ${color} rounded-full`} />;
  };

  return (
    <div className="relative notifications-dropdown">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg relative"
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
            {unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}
          </span>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notificaciones</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notificationsArray.length ? (
              notificationsArray.slice(0, 3).map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No tienes notificaciones nuevas
              </div>
            )}
          </div>
          <div className="p-3 border-t border-gray-200">
            <button
              onClick={() => router.visit('/notifications')}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todas las notificaciones
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalNotifications;
