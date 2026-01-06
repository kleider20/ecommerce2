// resources/js/Components/Logo.jsx
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from '@inertiajs/react';

const Logo = ({ size = 'default', withText = true, className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    default: 'w-10 h-10 text-xl',
    large: 'w-12 h-12 text-2xl'
  };

  const getTextSize = () => {
    switch (size) {
      case 'small': return 'text-sm';
      case 'large': return 'text-2xl';
      default: return 'text-xl';
    }
  };

  const logoContent = (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center`}>
        <ShoppingBag className={`w-${size === 'small' ? '4' : size === 'large' ? '6' : '6'} h-${size === 'small' ? '4' : size === 'large' ? '6' : '6'} text-white`} />
      </div>
      {withText && (
        <div>
          <h1 className={`${getTextSize()} font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
            TechShopNova
          </h1>
          {size !== 'small' && <p className="text-xs text-gray-500">2026</p>}
        </div>
      )}
    </div>
  );

  return (
    <Link href={route('/')} className="flex-shrink-0">
      {logoContent}
    </Link>
  );
};

export default Logo;
