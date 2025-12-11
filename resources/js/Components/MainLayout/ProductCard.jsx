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


/* import React from 'react';
import { formatCurrency } from '@/utils/formatCurrency';
import { ShoppingCart, AlertCircle } from 'lucide-react';

const ProductCard = ({ product, userConfig }) => {
  if (!userConfig) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full">
        <div className="h-48 bg-gray-100 animate-pulse"></div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-4 flex-grow"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse mt-auto"></div>
        </div>
      </div>
    );
  }

  const exchangeRate = userConfig.exchange_rate_to_usd || 1;
  const priceInLocal = product.price_usd * exchangeRate;
  const originalPriceInLocal = product.original_price_usd
    ? product.original_price_usd * exchangeRate
    : null;

  const hasDiscount = originalPriceInLocal && originalPriceInLocal > priceInLocal;
  const discountPercentage = hasDiscount
    ? Math.round(100 - (priceInLocal / originalPriceInLocal) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group flex flex-col h-full">
      <div className="relative">
        <div className="aspect-square">
          <img
            src={product.image_url || `https://placehold.co/400x400/eff6ff/1e40af?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x400/f3f4f6/6b7280?text=Sin+imagen';
            }}
          />
        </div>

        {!product.in_stock && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <AlertCircle size={12} />
            AGOTADO
          </div>
        )}

        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            -{discountPercentage}%
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 leading-tight min-h-[44px]">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-3 mt-auto">
          <div className="flex items-center flex-wrap gap-1">
            <span className="text-base font-bold text-gray-900">
              {formatCurrency(priceInLocal, userConfig)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(originalPriceInLocal, userConfig)}
              </span>
            )}
          </div>
        </div>

        <button
          disabled={!product.in_stock}
          className={`w-full py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            product.in_stock
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md active:scale-[0.98]'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {product.in_stock ? (
            <>
              <ShoppingCart size={16} />
              Agregar al carrito
            </>
          ) : (
            'No disponible'
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
 */



// resources/js/Components/ProductCard.jsx
import React from 'react';
import { formatCurrency } from '@/utils/formatCurrency';
import {
  Eye,
  AlertCircle,
  Star,
  Heart,
  Truck,
  BadgeCheck,
  Clock,
  Package,
  MapPin,
  ShieldCheck
} from 'lucide-react';

const ProductCard = ({
  product,
  userConfig,
  onViewDetails,
  onToggleFavorite,
  isFavorite = false
}) => {
  if (!userConfig) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col h-full">
        <div className="relative">
          <div className="aspect-square bg-gray-100 animate-pulse"></div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
          <div className="mt-auto flex gap-2">
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse flex-1"></div>
            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const exchangeRate = userConfig.exchange_rate_to_usd || 1;
  const priceInLocal = product.price_usd * exchangeRate;
  const originalPriceInLocal = product.original_price_usd
    ? product.original_price_usd * exchangeRate
    : null;

  const hasDiscount = originalPriceInLocal && originalPriceInLocal > priceInLocal;
  const discountPercentage = hasDiscount
    ? Math.round(100 - (priceInLocal / originalPriceInLocal) * 100)
    : 0;

  const showLowStock = product.in_stock && product.stock <= 5 && product.stock > 0;
  const hasReviews = product.rating && product.review_count > 0;
  const safeRating = product.rating ? parseFloat(product.rating) : 0;

  const categoryName = product.category && typeof product.category === 'object'
    ? product.category.name
    : product.category;

  let badge = null;
  if (product.is_bestseller) {
    badge = { text: 'Más vendido', color: 'bg-orange-100 text-orange-800', icon: Package };
  } else if (product.is_new) {
    badge = { text: 'Nuevo', color: 'bg-green-100 text-green-800', icon: Clock };
  } else if (categoryName) {
    badge = { text: categoryName, color: 'bg-blue-100 text-blue-800' };
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group flex flex-col h-full">
      <div className="relative">
        <div className="aspect-square">
          <img
            src={product.image_url || `https://placehold.co/400x400/eff6ff/1e40af?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x400/f3f4f6/6b7280?text=Sin+imagen';
            }}
          />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onToggleFavorite) onToggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110 z-10"
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart
            size={16}
            className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors duration-200`}
          />
        </button>

        {!product.in_stock && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
            <AlertCircle size={12} />
            AGOTADO
          </div>
        )}

        {hasDiscount && (
          <div className="absolute top-10 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
            -{discountPercentage}%
          </div>
        )}

        {badge && !hasDiscount && product.in_stock && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md border border-gray-200 z-10">
            {badge.icon && <badge.icon size={12} className="text-current" />}
            {badge.text}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          {categoryName && !product.is_bestseller && !product.is_new && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {categoryName}
            </span>
          )}
          {(product.is_bestseller || product.is_new) && (
            <span className={`text-xs ${badge?.color} px-2 py-1 rounded-full flex items-center gap-1`}>
              {badge?.icon && <badge.icon size={12} />}
              {badge?.text}
            </span>
          )}
          {product.brand && (
            <span className="text-xs text-gray-500 font-medium">
              {product.brand}
            </span>
          )}
        </div>

        {/* 👇 Nombre con altura fija y truncado */}
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 leading-tight min-h-[44px]">
          {product.name}
        </h3>

        {hasReviews && (
          <div className="flex items-center gap-1 mb-2 text-xs text-gray-600">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(safeRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-medium text-gray-900">{safeRating.toFixed(1)}</span>
            <span>({product.review_count})</span>
          </div>
        )}

        {showLowStock && (
          <div className="flex items-center gap-1 mb-2">
            <AlertCircle size={14} className="text-orange-500 flex-shrink-0" />
            <p className="text-xs text-orange-600 font-medium">
              ¡Solo quedan {product.stock} unidades!
            </p>
          </div>
        )}

        {product.free_shipping && (
          <div className="flex items-center gap-1 mb-2">
            <Truck size={14} className="text-green-600 flex-shrink-0" />
            <p className="text-xs text-green-700 font-medium">
              Envío gratis
            </p>
          </div>
        )}

        {product.warranty && (
          <div className="flex items-center gap-1 mb-3">
            <ShieldCheck size={14} className="text-blue-600 flex-shrink-0" />
            <p className="text-xs text-blue-700 font-medium">
              {product.warranty}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-3 mt-auto">
          <div className="flex items-center flex-wrap gap-1">
            <span className="text-base font-bold text-gray-900">
              {formatCurrency(priceInLocal, userConfig)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(originalPriceInLocal, userConfig)}
              </span>
            )}
            {product.price_per_unit && (
              <span className="text-xs text-gray-500 ml-1">
                {product.price_per_unit}
              </span>
            )}
          </div>
        </div>

        {/* 👇 Botón "Ver detalles" con estilo uniforme */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails && onViewDetails(product)}
            className="flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white shadow-sm hover:shadow-md active:scale-[0.98]"
            aria-label={`Ver detalles de ${product.name}`}
          >
            <Eye size={16} />
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
