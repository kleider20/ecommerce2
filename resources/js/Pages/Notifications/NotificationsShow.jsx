// // resources/js/Pages/Users/Notifications/NotificationsShow.jsx
// import React from 'react';
// import { Head, router } from '@inertiajs/react';
// import { ArrowLeft, Package, Truck, Gift, Star, User, CheckCircle, Trash2 } from 'lucide-react';
// import { toast } from 'react-toastify';
// import PageWrapper from '@/Layouts/PageWrapper';

// const NotificationDetail = ({ notification }) => {
//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case 'order': return Package;
//       case 'promotion': return Gift;
//       case 'review': return Star;
//       case 'account': return User;
//       default: return Package;
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

//   const deleteNotification = () => {
//     router.delete(`/notifications/${notification.id}`, {
//       onSuccess: () => {
//         toast.success('Notificación eliminada');
//         router.visit('/notifications');
//       }
//     });
//   };

//   const IconComponent = getNotificationIcon(notification.type);
//   const colorClass = getNotificationColor(notification.type);

//   return (
//     <PageWrapper>
//       <Head title={`Notificación - ${notification.message}`} />
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button onClick={() => router.visit('/notifications')} className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
//               <ArrowLeft className="w-5 h-5" />
//             </button>
//             <h1 className="text-2xl font-bold text-gray-900">Notificación</h1>
//           </div>
//           <button onClick={deleteNotification} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors">
//             <Trash2 className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//           <div className={`p-6 ${!notification.read ? 'bg-blue-50' : ''}`}>
//             <div className="flex items-start gap-4">
//               <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClass}`}>
//                 <IconComponent className="w-6 h-6" />
//               </div>
//               <div className="flex-1">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-1">{notification.message}</h2>
//                 <p className="text-sm text-gray-600">{notification.time}</p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6 border-t border-gray-200">
//             {notification.type === 'order' && notification.details && (
//               <div className="space-y-4">
//                 <h3 className="font-semibold text-gray-900">Detalles del Pedido</h3>
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div><p className="text-gray-600">Número de pedido</p><p className="font-medium">#{notification.details.orderId}</p></div>
//                   <div><p className="text-gray-600">Número de seguimiento</p><p className="font-medium">{notification.details.trackingNumber}</p></div>
//                   <div><p className="text-gray-600">Entrega estimada</p><p className="font-medium">{notification.details.estimatedDelivery}</p></div>
//                   <div><p className="text-gray-600">Total del pedido</p><p className="font-medium">{notification.details.total}</p></div>
//                 </div>
//                 {notification.details.items && (
//                   <div className="mt-4">
//                     <h4 className="font-medium text-gray-900 mb-2">Artículos</h4>
//                     <div className="space-y-2">
//                       {notification.details.items.map((item, index) => (
//                         <div key={index} className="flex justify-between text-sm">
//                           <span>{item.name} (x{item.quantity})</span>
//                           <span>{item.price}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 <div className="flex gap-3 pt-4">
//                   <button onClick={() => router.visit(`/orders/${notification.details.orderId}`)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
//                   >
//                     <Package className="w-4 h-4" />
//                     Ver pedido
//                   </button>
//                   {notification.details.trackingNumber && (
//                     <button onClick={() => router.visit(`/tracking/${notification.details.trackingNumber}`)}
//                       className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
//                     >
//                       <Truck className="w-4 h-4" />
//                       Seguimiento
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}

//             {notification.type === 'promotion' && notification.details && (
//               <div className="space-y-4">
//                 <h3 className="font-semibold text-gray-900">Detalles de la Promoción</h3>
//                 <div className="bg-purple-50 rounded-lg p-4">
//                   <h4 className="font-bold text-purple-800 text-lg mb-2">{notification.details.promotionTitle}</h4>
//                   <p className="text-purple-700 mb-3">{notification.details.discount}</p>
//                   <div className="flex items-center gap-4 text-sm">
//                     <div><p className="text-purple-600 font-medium">Categorías:</p><p>{notification.details.categories?.join(', ')}</p></div>
//                     <div><p className="text-purple-600 font-medium">Válido hasta:</p><p>{notification.details.validUntil}</p></div>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <p className="text-sm text-gray-600 mb-2">Código de descuento</p>
//                     <div className="flex items-center gap-2">
//                       <span className="font-mono font-bold bg-white px-3 py-2 rounded border border-gray-300">
//                         {notification.details.code}
//                       </span>
//                       <button onClick={() => { navigator.clipboard.writeText(notification.details.code); toast.success('Código copiado'); }}
//                         className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded transition-colors"
//                       >
//                         <CopyIcon className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="flex items-end">
//                     <button onClick={() => router.visit('/shop')}
//                       className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
//                     >
//                       <Gift className="w-4 h-4" />
//                       Ver ofertas
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {notification.type === 'review' && notification.details && (
//               <div className="space-y-4">
//                 <h3 className="font-semibold text-gray-900">Tu Reseña</h3>
//                 <div className="bg-yellow-50 rounded-lg p-4">
//                   <div className="flex items-center gap-2 mb-3">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className={`w-5 h-5 ${i < notification.details.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-600">{notification.details.rating} estrellas</span>
//                   </div>
//                   <p className="text-yellow-800 mb-2">"{notification.details.reviewText}"</p>
//                   <p className="text-sm text-yellow-700">Producto: {notification.details.productName}</p>
//                   <p className="text-xs text-yellow-600">Publicado el: {notification.details.reviewDate}</p>
//                 </div>
//                 <div className="flex gap-3 pt-4">
//                   <button onClick={() => router.visit('/')}
//                     className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
//                   >
//                     <EditIcon className="w-4 h-4" />
//                     Editar reseña
//                   </button>
//                   <button onClick={deleteNotification}
//                     className="text-red-600 hover:text-red-700 border border-red-300 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Eliminar
//                   </button>
//                 </div>
//               </div>
//             )}

//             {notification.type === 'account' && notification.details && (
//               <div className="space-y-4">
//                 <h3 className="font-semibold text-gray-900">Verificación de Cuenta</h3>
//                 <div className="bg-blue-50 rounded-lg p-4">
//                   <div className="flex items-center gap-3 mb-3">
//                     <CheckCircle className="w-6 h-6 text-blue-600" />
//                     <span className="font-medium text-blue-800">¡Cuenta verificada con éxito!</span>
//                   </div>
//                   <p className="text-blue-700 mb-3">
//                     Tu cuenta ha sido verificada el {notification.details.verificationDate}.
//                   </p>
//                   {notification.details.benefits && (
//                     <div>
//                       <p className="text-sm text-blue-600 font-medium mb-2">Beneficios de verificación:</p>
//                       <ul className="text-sm text-blue-700 space-y-1">
//                         {notification.details.benefits.map((benefit, index) => (
//                           <li key={index} className="flex items-start gap-2">
//                             <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
//                             {benefit}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//                 <div className="bg-white border border-blue-200 rounded-lg p-4">
//                   <h4 className="font-medium text-gray-900 mb-2">Próximos pasos</h4>
//                   <p className="text-sm text-gray-600">
//                     Ahora puedes aprovechar todos los beneficios de tu cuenta verificada.
//                     ¡Gracias por confiar en nosotros!
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </PageWrapper>
//   );
// };

// // Helper components
// const EditIcon = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//   </svg>
// );

// const CopyIcon = ({ className }) => (
//   <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//   </svg>
// );

// export default NotificationDetail;



// resources/js/Pages/Notifications/NotificationsShow.jsx
import React from 'react';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Package, Truck, Gift, Star, User, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import AutoLayoutResolver from '@/Layouts/AutoLayoutResolver';

const NotificationDetail = ({ notification }) => {
  const deleteNotification = () => {
    router.delete(`/notifications/${notification.id}`, {
      onSuccess: () => {
        toast.success('Notificación eliminada');
        router.visit('/notifications');
      }
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case 'order': return Package;
      case 'promotion': return Gift;
      case 'review': return Star;
      case 'account': return User;
      default: return Package;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'order': return 'bg-green-100 text-green-600';
      case 'promotion': return 'bg-purple-100 text-purple-600';
      case 'review': return 'bg-yellow-100 text-yellow-600';
      case 'account': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const IconComponent = getIcon(notification.type);
  const colorClass = getColor(notification.type);

  return (
    <AutoLayoutResolver>
      <Head title={`Notificación - ${notification.message}`} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.visit('/notifications')} className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Notificación</h1>
          </div>
          <button onClick={deleteNotification} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className={`p-6 ${!notification.read ? 'bg-blue-50' : ''}`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClass}`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{notification.message}</h2>
                <p className="text-sm text-gray-600">{notification.time}</p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            {notification.type === 'order' && notification.details && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Detalles del Pedido</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-gray-600">Número de pedido</p><p className="font-medium">#{notification.details.orderId}</p></div>
                  <div><p className="text-gray-600">Entrega estimada</p><p className="font-medium">{notification.details.estimatedDelivery}</p></div>
                  <div><p className="text-gray-600">Total del pedido</p><p className="font-medium">{notification.details.total}</p></div>
                </div>

                {notification.details.items && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Artículos</h4>
                    {notification.details.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => router.visit(`/orders/${notification.details.orderId}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    Ver pedido
                  </button>
                </div>
              </div>
            )}

            {/* Agrega otros tipos de notificaciones aquí */}
          </div>
        </div>
      </div>
    </AutoLayoutResolver>
  );
};

export default NotificationDetail;
