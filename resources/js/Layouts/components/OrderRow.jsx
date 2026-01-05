// resources/js/Layouts/2026/Users/components/OrderRow.jsx
import React from 'react';
import { Package, Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';

const OrderRow = ({ order, onView }) => (
  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
        <Package className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <p className="font-medium text-gray-900">Pedido #{order.id}</p>
        <p className="text-sm text-gray-600">{order.items} artículos • {order.date}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <StatusBadge status={order.status} />
      <p className="font-semibold text-gray-900">{order.total}</p>
      <button
        onClick={onView}
        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
      >
        <Eye className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default OrderRow;
