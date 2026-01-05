// resources/js/Layouts/2026/Users/components/WishlistItem.jsx
import React from 'react';
import { Trash2, Star } from 'lucide-react';

const WishlistItem = ({ item, onRemove }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
    <div className="p-4">
      <div className="flex justify-between">
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
          <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
        </div>
        <button
          onClick={onRemove}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <h3 className="font-medium text-gray-900 mt-4 mb-2 line-clamp-2">{item.name}</h3>
      <div className="flex items-center gap-1 mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(item.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 ml-1">({item.reviews})</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{item.price}</span>
          <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors">
          Comprar ahora
        </button>
      </div>
    </div>
  </div>
);

export default WishlistItem;
