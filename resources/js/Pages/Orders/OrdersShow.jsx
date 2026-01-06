// resources/js/Pages/User/Orders/Show.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import { Package, Truck, MapPin, Clock } from 'lucide-react';

const OrderDetail = ({ order }) => {
  return (
    <>
      <Head title={`Pedido #${order.order_number}`} />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Pedido #{order.order_number}</h1>
                <p className="opacity-90">Realizado el {order.created_at_formatted}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 ${order.status_color}`}>
                {order.status_label}
              </span>
            </div>
          </div>

          {/* Resumen */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen del Pedido</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Dirección de Envío</h3>
                <p className="text-gray-600 whitespace-pre-line">{order.shipping_address}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Total del Pedido</h3>
                <p className="text-2xl font-bold text-gray-900">${order.total}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Artículos</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  {item.product_image ? (
                    <img src={item.product_image} alt={item.product_name} className="w-16 h-16 object-cover rounded-lg" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product_name}</h3>
                    <p className="text-gray-600">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">${item.total}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Package className="w-4 h-4" />
                Ver estado del pedido
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Truck className="w-4 h-4" />
                Seguimiento de envío
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
