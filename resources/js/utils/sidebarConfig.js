// resources/js/config/sidebarConfig.js
import {
  Home,
  UserRoundCog,
  Settings,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Building2,
  Store,
  Shield,
  Award,
  HandCoins,
  Plus,
  Users,
} from 'lucide-react';

// ✅ Configuración centralizada con soporte para submenús
export const sidebarRoutes = [
  // === Rutas comunes ===

  {
    id: 'home',
    label: 'Inicio',
    icon: Home,
    routeName: '/',
    permission: null,
    roles: ['all']
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    routeName: 'dashboard',
    permission: null,
    roles: ['all']
  },

//   {
//     id: 'profile',
//     label: 'Mi Perfil',
//     icon: Home,
//     routeName: 'profile',
//     permission: null,
//     roles: ['all']
//   },


  // === Rutas de usuario ===
  {
    id: 'user_settings',
    label: 'Configuración',
    icon: Settings,
    routeName: 'user.settings',
    permission: '',
    roles: ['super_admin','user', 'proveedor', 'vendedor']
  },


   // === Rutas de usuario ===
  {
    id: 'system_config',
    label: 'Configuración General',
    icon: Settings,
    routeName: 'system.config',
    permission: '',
    roles: ['super_admin']
  },

//   // === Rutas de administración con submenú ===
//   {
//     id: 'roles',
//     label: 'Roles y Permisos',
//     icon: UserRoundCog,
//     routeName: 'roles.index',
//     permission: 'manage_roles_permissions',
//     roles: ['super_admin', 'admin'],
//     submenu: [
//       {
//         id: 'roles.create',
//         label: 'Crear Rol',
//         routeName: 'roles.create',
//         permission: 'manage_roles_permissions',
//         icon: Plus,
//         roles: ['super_admin', 'admin']
//       },
//       {
//         id: 'permissions.create',
//         label: 'Crear Permiso',
//         routeName: 'permissions.create',
//         permission: 'manage_roles_permissions',
//         icon: HandCoins,
//         roles: ['super_admin', 'admin']
//       }
//     ]
//   },

  // === Rutas de proveedor ===
//   {
//         id: 'provider_products',
//         label: 'Gestión de Productos',
//         icon: Building2,
//         routeName: 'provider.products',
//         permission: 'manage_own_products',
//         roles: ['proveedor'],
//         submenu: [
//         {
//             id: 'products.create',
//             label: 'Crear Producto',
//             routeName: 'provider.products.create',
//             permission: 'create_products',
//             icon: Plus,
//             roles: ['proveedor']
//         },
//         {
//             id: 'products.categories',
//             label: 'Categorías',
//             routeName: 'provider.categories',
//             permission: 'manage_categories',
//             icon: Package,
//             roles: ['proveedor']
//         }
//         ]
//     },

  // === Rutas de vendedor ===
//   {
//     id: 'seller_store',
//     label: 'Mi Tienda',
//     icon: Store,
//     routeName: 'seller.store',
//     permission: 'manage_own_store',
//     roles: ['vendedor'],
//     submenu: [
//       {
//         id: 'store.orders',
//         label: 'Pedidos',
//         routeName: 'seller.orders',
//         permission: 'view_orders',
//         icon: Package,
//         roles: ['vendedor']
//       },
//       {
//         id: 'store.earnings',
//         label: 'Ganancias',
//         routeName: 'seller.earnings',
//         permission: 'view_own_earnings',
//         icon: Award,
//         roles: ['vendedor']
//       }
//     ]
//   },

  // === Usuarios (solo admin) ===
//   {
//     id: 'users',
//     label: 'Usuarios',
//     icon: Users,
//     routeName: 'users.index',
//     permission: 'view_users',
//     roles: ['super_admin', 'admin'],
//     submenu: [
//       {
//         id: 'users.create',
//         label: 'Crear Usuario',
//         routeName: 'users.create',
//         permission: 'manage_users',
//         icon: Plus,
//         roles: ['super_admin', 'admin']
//       }
//     ]
//   }
];

// ✅ Función segura para filtrar rutas por rol
export const getRoutesByRole = (userRoles = []) => {
  const roles = Array.isArray(userRoles) ? userRoles : [];

  return sidebarRoutes
    .map(route => {
      // Filtrar submenú por roles
      if (route.submenu) {
        const filteredSubmenu = route.submenu.filter(sub =>
          sub.roles.includes('all') || sub.roles.some(r => roles.includes(r))
        );
        return filteredSubmenu.length > 0
          ? { ...route, submenu: filteredSubmenu }
          : { ...route, submenu: null };
      }
      return route;
    })
    .filter(route =>
      route.roles.includes('all') ||
      route.roles.some(r => roles.includes(r))
    );
};

// ✅ Función segura para filtrar por permisos
export const getRoutesByPermission = (userRoles, userPermissions = []) => {
  const permissions = Array.isArray(userPermissions) ? userPermissions : [];
  const routesByRole = getRoutesByRole(userRoles);

  return routesByRole
    .map(route => {
      // Filtrar submenú por permisos
      if (route.submenu) {
        const filteredSubmenu = route.submenu.filter(sub =>
          !sub.permission || permissions.includes(sub.permission)
        );
        return filteredSubmenu.length > 0
          ? { ...route, submenu: filteredSubmenu }
          : { ...route, submenu: null };
      }
      return route;
    })
    .filter(route =>
      !route.permission || permissions.includes(route.permission)
    );
};
