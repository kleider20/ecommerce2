/* // resources/js/Components/ProductCard.jsx
import React from 'react';
import { Star } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';

const ProductCard = ({ product, globalConfig }) => {

    const price = product.price_usd;
    const originalPrice = product.original_price_usd;
    const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 object-cover"
        />
        {!product.inStock && (
          <div className="absolute top-1 left-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            AGOTADO
          </div>
        )}
        {product.originalPrice > product.price && (
          <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            -{(100 - (product.price / product.originalPrice) * 100).toFixed(0)}%
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-600">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-bold text-gray-900">
              {formatCurrency(product.price, globalConfig)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-500 line-through">
                {formatCurrency(product.originalPrice, globalConfig)}
              </span>
            )}
          </div>
        </div>

        <button
          disabled={!product.inStock}
          className={`w-full py-1.5 px-2 rounded text-xs font-medium transition-colors ${
            product.inStock
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.inStock ? 'Agregar' : 'No Disponible'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; */


// resources/js/Components/ProductCard.jsx
import React from 'react';
import { formatCurrency } from '@/utils/formatCurrency';

const ProductCard = ({ product, userConfig }) => {
  // ✅ Protección: si userConfig no está listo, muestra un placeholder
  if (!userConfig) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-32 bg-gray-200 animate-pulse"></div>
        <div className="p-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  // ✅ Usa exchange_rate_to_usd (asegúrate de que exista)
  const exchangeRate = userConfig.exchange_rate_to_usd || 1;
  const priceInLocal = product.price_usd / exchangeRate; // USD → moneda local
  const originalPriceInLocal = product.original_price_usd
    ? product.original_price_usd / exchangeRate
    : null;

  const hasDiscount = originalPriceInLocal && originalPriceInLocal > priceInLocal;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        {/* ✅ Corregido: sin espacios en la URL */}
        <img
          src={product.image_url || `https://placehold.co/300x300?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className="w-full h-32 object-cover"
          onError={(e) => {
            e.target.src = 'https://placehold.co/300x300/ccc/666?text=Sin+imagen';
          }}
        />
        {!product.in_stock && (
          <div className="absolute top-1 left-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            AGOTADO
          </div>
        )}
        {hasDiscount && (
          <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            -{(100 - (priceInLocal / originalPriceInLocal) * 100).toFixed(0)}%
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <span className="text-sm font-bold text-gray-900">
              {formatCurrency(priceInLocal, userConfig)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-500 line-through">
                {formatCurrency(originalPriceInLocal, userConfig)}
              </span>
            )}
          </div>
        </div>

        <button
          disabled={!product.in_stock}
          className={`w-full py-1.5 px-2 rounded text-xs font-medium transition-colors ${
            product.in_stock
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.in_stock ? 'Agregar' : 'No Disponible'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
