// resources/js/Components/2026/HomeLayout/ProductCard.jsx
import React from 'react';
import { usePage } from '@inertiajs/react';
import {
  Heart,
  ShoppingCart,
  Eye,
  Star,
  Tag,
  AlertCircle,
  Truck,
  ShieldCheck
} from 'lucide-react';
import Badge from '@/Components/2026/HomeLayout/Badge';

const ProductCard = ({
  product,
  onToggleFavorite,
  isFavorite = false,
  onViewDetails
}) => {
  // ✅ Obtiene userConfig directamente del contexto global
  const { userConfig } = usePage().props;

  // ✅ Si userConfig no está listo, muestra loader
  if (!userConfig) {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 flex flex-col h-full animate-pulse">
        <div className="w-full h-64 bg-gray-200"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // ✅ Lógica exacta del primer componente (con userConfig global)
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

  // ✅ Extrae categoría y subcategoría del objeto (sin categoryMap)
  const categoryName = product.category && typeof product.category === 'object'
    ? product.category.name
    : product.category;

  const subcategoryName = product.subcategory && typeof product.subcategory === 'object'
    ? product.subcategory.name
    : product.subcategory;

  // ✅ Badge lógico
  let badgeType = 'new';
  let badgeText = 'Nuevo';
  if (product.is_bestseller) {
    badgeType = 'bestseller';
    badgeText = 'Más vendido';
  } else if (subcategoryName) {
    badgeType = 'popular';
    badgeText = subcategoryName;
  } else if (categoryName) {
    badgeType = 'popular';
    badgeText = categoryName;
  }

  // ✅ Función de formato usando userConfig global
  const formatCurrency = (amount) => {
    const {
      currency_code: currencyCode = 'USD',
      currency_symbol: currencySymbol = '$',
      currency_decimal_separator: decimalSeparator = '.',
      currency_thousand_separator: thousandSeparator = ',',
      currency_decimal_digits: decimalDigits = 2,
      currency_symbol_position: symbolPosition = 'before'
    } = userConfig;

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimalDigits,
      maximumFractionDigits: decimalDigits,
      useGrouping: true
    }).format(amount);

    let formatted = formatter
      .replace(/\./g, 'TEMP_DECIMAL')
      .replace(/,/g, thousandSeparator)
      .replace(/TEMP_DECIMAL/g, decimalSeparator);

    return symbolPosition === 'before'
      ? `${currencySymbol}${formatted}`
      : `${formatted}${currencySymbol}`;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-full border border-gray-200">
      <div className="relative">
        <img
          src={product.image_url || `https://placehold.co/300x300/3b82f6/ffffff?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://placehold.co/300x300/f3f4f6/6b7280?text=Sin+imagen';
          }}
        />

        {/* Badges */}
        {!product.in_stock && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            AGOTADO
          </div>
        )}

        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            -{discountPercentage}%
          </div>
        )}

        {product.in_stock && !hasDiscount && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            Nuevo
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onToggleFavorite) onToggleFavorite(product.id);
              }}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-110"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
            <button className="w-10 h-10 bg-blue-600/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-110">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewDetails && onViewDetails(product)}
              className="w-10 h-10 bg-gray-800/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-110"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {categoryName || 'Producto'}
          </span>
          <Badge type={badgeType} text={badgeText} />
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

        {hasReviews && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(safeRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">({product.review_count})</span>
          </div>
        )}

        <p className="text-xs text-gray-500 mb-2">
          Por {product.supplier?.name || 'Proveedor'}
        </p>

        {(showLowStock || product.free_shipping || product.warranty) && (
          <div className="mb-3 space-y-1 text-xs">
            {showLowStock && (
              <div className="flex items-center gap-1 text-orange-600">
                <AlertCircle className="w-3 h-3" />
                ¡Solo quedan {product.stock} unidades!
              </div>
            )}
            {product.free_shipping && (
              <div className="flex items-center gap-1 text-green-600">
                <Truck className="w-3 h-3" />
                Envío gratis
              </div>
            )}
            {product.warranty && (
              <div className="flex items-center gap-1 text-blue-600">
                <ShieldCheck className="w-3 h-3" />
                {product.warranty}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900">
              {formatCurrency(priceInLocal)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(originalPriceInLocal)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
