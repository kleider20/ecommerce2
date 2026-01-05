// // resources/js/Layouts/2026/Users/components/UserSidebar.jsx
// import React from 'react';
// import { User, Package, Heart, MapPin, CreditCard, Settings, Award } from 'lucide-react';

// const sidebarItems = [
//   { id: 'overview', label: 'Información General', icon: User },
//   { id: 'orders', label: 'Mis Pedidos', icon: Package },
//   { id: 'wishlist', label: 'Lista de Deseos', icon: Heart },
//   { id: 'addresses', label: 'Direcciones', icon: MapPin },
//   { id: 'payment', label: 'Métodos de Pago', icon: CreditCard },
//   { id: 'settings', label: 'Configuración', icon: Settings },
// ];

// const UserSidebar = ({ user, activeTab, onTabChange }) => (
//   <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//     <div className="flex items-center gap-3 mb-6">
//       <img
//         src={user.avatar || 'https://placehold.co/80x80/3b82f6/ffffff?text=U'}
//         alt={user.name}
//         className="w-12 h-12 rounded-full border-2 border-gray-300"
//       />
//       <div>
//         <h2 className="font-semibold text-gray-900">{user.name}</h2>
//         <p className="text-sm text-gray-600">{user.email}</p>
//       </div>
//     </div>

//     <div className="space-y-1">
//       {sidebarItems.map(item => {
//         const Icon = item.icon;
//         return (
//           <button
//             key={item.id}
//             onClick={() => onTabChange(item.id)}
//             className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
//               activeTab === item.id
//                 ? 'bg-blue-50 text-blue-700 font-medium'
//                 : 'text-gray-700 hover:bg-gray-50'
//             }`}
//           >
//             <Icon className="w-4 h-4" />
//             {item.label}
//           </button>
//         );
//       })}
//     </div>

//     <div className="mt-6 pt-6 border-t border-gray-200">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-medium text-gray-900">
//             Miembro {user.membership || 'Básico'}
//           </p>
//           <p className="text-xs text-gray-600">Desde {user.memberSince || '2024'}</p>
//         </div>
//         <Award className="w-6 h-6 text-yellow-500" />
//       </div>
//     </div>
//   </div>
// );

// export default UserSidebar;



// resources/js/Layouts/2026/Users/components/UserSidebar.jsx
import React, { useState, useEffect } from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  Award, // 👈 ¡AHORA ESTÁ IMPORTADO!
  Home,
  UserRoundCog,
} from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { getRoutesByPermission } from '@/utils/sidebarConfig';

const UserSidebar = ({ user }) => {
  const { props } = usePage();
  const authUser = props.auth?.user;

  if (!authUser) return null;

  const userPermissions = authUser.permissions || [];
  const userRoles = authUser.roles || [];

  const menuItemsConfig = getRoutesByPermission(userRoles, userPermissions);
  const menuItems = menuItemsConfig.map(item => ({
    ...item,
    route: route(item.routeName)
  }));

  const [openSubmenus, setOpenSubmenus] = useState(new Set());

  const visibleItems = menuItems.filter(item => {
    if (!item.permission) return true;
    return userPermissions.includes(item.permission);
  });

  const renderItem = (item) => {
    const Icon = item.icon;
    const isActive = route().current(item.routeName);

    return (
      <Link
        key={item.id}
        href={item.route}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
          isActive
            ? 'bg-blue-50 text-blue-700 font-medium'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Icon className="w-4 h-4" />
        {item.label}
      </Link>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <img
          src={user.avatar || 'https://placehold.co/80x80/3b82f6/ffffff?text=U'}
          alt={user.name}
          className="w-12 h-12 rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 className="font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="space-y-1">
        {visibleItems.map(renderItem)}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Miembro {user.membership || 'Básico'}
            </p>
            <p className="text-xs text-gray-600">Desde {user.memberSince || '2024'}</p>
          </div>
          <Award className="w-6 h-6 text-yellow-500" /> {/* ✅ Ahora funciona */ }
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
