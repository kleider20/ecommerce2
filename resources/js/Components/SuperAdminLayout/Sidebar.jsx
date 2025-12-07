// resources/js/Layouts/SuperAdmin/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import {
  Home, Building2, Users, Activity, DollarSign, BarChart3, Settings, Shield, X, Package,
  Plus, List, Store, User, Globe, FileText, Cog, HandCoins, MonitorCog
} from 'lucide-react';
import { Link, usePage} from '@inertiajs/react';

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    route: 'dashboard',
    permission: null
  },
  {
    id: 'global.setting',
    label: 'Configuracion Global',
    icon: Settings,
    permission: null,

    submenu: [
        {
        id: 'settings.general.edit',
        label: 'Configuracion General del Sistema',
        route: 'settings.general.edit',
        permission: null,
        icon: MonitorCog
      },
      {
        id: 'currency.edit',
        label: 'Moneda y Tasas',
        route: 'settings.currency.edit',
        permission: null,
        icon: HandCoins
      },
    ]
  },

  {
    id: 'Categorias Para Productos',
    label: 'Categorias Para Productos',
    icon: Settings,
    permission: null,

    submenu: [
        {
        id: 'crear.categorias',
        label: 'Crear Categorias',
        route: 'crear.categorias',
        permission: null,
        icon: MonitorCog
      },
    //   {
    //     id: 'currency.edit',
    //     label: 'Moneda y Tasas',
    //     route: 'settings.currency.edit',
    //     permission: null,
    //     icon: HandCoins
    //   },
    ]
  },
  {
    id: 'products',
    label: 'Productos',
    icon: Package,
    permission: null,
    submenu: [
      {
        id: 'products.create',
        label: 'Crear Producto',
        route: 'products.create',
        permission: null,
        icon: Plus
      },
      {
        id: 'products.index',
        label: 'Lista de Productos',
        route: 'products.index',
        permission: null,
        icon: List
      }
    ]
  },
  {
    id: 'stores',
    label: 'Tiendas',
    icon: Building2,
    route: 'superadmin.stores.index',
    permission: 'view stores',
    submenu: [
      {
        id: 'stores.list',
        label: 'Todas las Tiendas',
        route: 'superadmin.stores.index',
        permission: 'view stores',
        icon: Store
      },
      {
        id: 'stores.create',
        label: 'Crear Tienda',
        route: 'superadmin.stores.create',
        permission: 'create stores',
        icon: Plus
      }
    ]
  },
  {
    id: 'users',
    label: 'Usuarios',
    icon: Users,
    route: 'superadmin.users.index',
    permission: 'view user list',
    submenu: [
      {
        id: 'users.list',
        label: 'Lista de Usuarios',
        route: 'superadmin.users.index',
        permission: 'view user list',
        icon: User
      },
      {
        id: 'users.roles',
        label: 'Roles y Permisos',
        route: 'superadmin.roles.index',
        permission: 'assign roles',
        icon: Shield
      }
    ]
  },
  {
    id: 'platform',
    label: 'Plataforma',
    icon: Activity,
    route: 'superadmin.platform',
    permission: 'manage global config',
    submenu: [
      {
        id: 'platform.countries',
        label: 'Países y Monedas',
        route: 'superadmin.countries.index',
        permission: 'manage countries',
        icon: Globe
      },
      {
        id: 'platform.config',
        label: 'Configuración Global',
        route: 'superadmin.settings',
        permission: 'manage global config',
        icon: Cog
      }
    ]
  },
  {
    id: 'revenue',
    label: 'Ingresos',
    icon: DollarSign,
    route: 'superadmin.revenue',
    permission: 'view platform revenue'
  },
  {
    id: 'analytics',
    label: 'Analítica',
    icon: BarChart3,
    route: 'superadmin.analytics',
    permission: 'view platform revenue',
    submenu: [
      {
        id: 'analytics.dashboard',
        label: 'Panel de Analítica',
        route: 'superadmin.analytics',
        permission: 'view platform revenue',
        icon: BarChart3
      },
      {
        id: 'analytics.reports',
        label: 'Reportes',
        route: 'superadmin.reports',
        permission: 'view platform revenue',
        icon: FileText
      }
    ]
  },
  {
    id: 'settings',
    label: 'Configuración',
    icon: Settings,
    route: 'superadmin.settings',
    permission: 'manage global config'
  }
];

const Sidebar = ({ isOpen, onClose }) => {
  const { props } = usePage();
  const user = props.auth?.user;

  if (!user) return null;

  const userPermissions = user.permissions || [];
  const userRoles = user.roles || [];

  const getInitialOpenSubmenus = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarOpenSubmenus');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  };

  const [openSubmenus, setOpenSubmenus] = useState(getInitialOpenSubmenus());

  useEffect(() => {
    localStorage.setItem('sidebarOpenSubmenus', JSON.stringify([...openSubmenus]));
  }, [openSubmenus]);

  // Apertura automática por ruta
  useEffect(() => {
    const newOpen = new Set(openSubmenus);
    visibleItems.forEach(item => {
      if (item.submenu && item.submenu.some(sub => route().current(sub.route))) {
        newOpen.add(item.id);
      }
    });
    if (newOpen.size !== openSubmenus.size || ![...newOpen].every(v => openSubmenus.has(v))) {
      setOpenSubmenus(newOpen);
    }
  }, [route().current()]);

  // Filtrar por permisos
  const visibleItems = menuItems
    .map(item => {
      if (item.submenu) {
        const visibleSubmenu = item.submenu.filter(subItem =>
          !subItem.permission || userPermissions.includes(subItem.permission)
        );
        return visibleSubmenu.length > 0 ? { ...item, submenu: visibleSubmenu } : null;
      }
      if (!item.permission || userPermissions.includes(item.permission)) {
        return item;
      }
      return null;
    })
    .filter(Boolean);

  const toggleSubmenu = (id) => {
    const newOpen = new Set(openSubmenus);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenSubmenus(newOpen);
  };

  const isSubmenuActive = (submenu) => {
    return submenu.some(subItem => route().current(subItem.route));
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">SuperAdmin</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md hover:bg-gray-700 text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-8 px-4 space-y-2">
        {visibleItems.map((item) => {
          const hasSubmenu = item.submenu;
          const isActive = hasSubmenu
            ? isSubmenuActive(item.submenu)
            : route().current(item.route);
          const isExpanded = openSubmenus.has(item.id);

          if (hasSubmenu) {
            return (
              <div key={item.id}>
                <button
                  onClick={() => toggleSubmenu(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </div>
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.submenu.map((subItem) => {
                      const isSubActive = route().current(subItem.route);
                      const SubIcon = subItem.icon || List; // fallback
                      return (
                        <Link
                          key={subItem.id}
                          href={route(subItem.route)}
                          className={`flex items-center px-4 py-2 text-xs rounded-lg ${
                            isSubActive
                              ? 'bg-emerald-600 text-white'
                              : 'text-gray-300 hover:bg-gray-800'
                          }`}
                        >
                          <SubIcon className="h-3.5 w-3.5 mr-2" />
                          {subItem.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.id}
              href={route(item.route)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-400">{userRoles.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
