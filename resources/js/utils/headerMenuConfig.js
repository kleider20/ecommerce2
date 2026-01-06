// resources/js/utils/headerMenuConfig.js
import {
  Home,
  Package,
  Award,
  Building2,
  Package as BlogIcon // Puedes importar otro ícono si lo deseas
} from 'lucide-react';

/**
 * Configuración del menú principal del Header
 *
 * Cada item puede tener:
 * - id: identificador único
 * - label: texto a mostrar
 * - icon: componente de ícono de Lucide React
 * - routeName: nombre de la ruta en Laravel (debe coincidir con route()->name())
 * - routeParams: (opcional) parámetros para la ruta, ej: { category: 'electronics' }
 * - permission: (opcional) nombre del permiso requerido
 * - roles: array de roles que pueden ver este item ('all' = cualquier rol)
 * - hasDropdown: (booleano) si el item tiene menú desplegable
 */
export const headerMenuItems = [
  {
    id: 'home',
    label: 'Inicio',
    icon: Home,
    routeName: '/', // Nombre de ruta definido en Laravel
    permission: null,
    roles: ['all']
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Award,
    routeName: 'dashboard',
    permission: null,
    roles: ['all'],
    requiresAuth: true
  },
//   {
//     id: 'offers',
//     label: 'Ofertas',
//     icon: Award,
//     routeName: 'offers.index',
//     permission: null,
//     roles: ['all']
//   },
//   {
//     id: 'providers',
//     label: 'Proveedores',
//     icon: Building2,
//     routeName: 'providers.index',
//     permission: null,
//     roles: ['all']
//   },
//   {
//     id: 'blog',
//     label: 'Blog',
//     icon: BlogIcon,
//     routeName: 'blog.index',
//     permission: null,
//     roles: ['all']
//   }
];

/**
 * Genera el menú completo del header, incluyendo categorías dinámicas
 * @param {Array} categories - Lista de categorías desde el backend
 * @returns {Array} - Menú completo con items estáticos + categorías
 */
export const generateHeaderMenu = (categories = []) => {
  // Items estáticos (inicio, ofertas, etc.)
  const staticItems = [...headerMenuItems];

  // Items dinámicos: categorías
  const categoryItems = categories.map(category => ({
    id: `category-${category.id}`,
    label: `${category.name} (${category.count})`,
    icon: Package,
    routeName: 'category.show',
    routeParams: { category: category.slug || category.id },
    permission: null,
    roles: ['all']
  }));

  // Insertar categorías después de "Inicio" o al final
  // Opción: agrupar bajo "Categorías" (requiere lógica de grupo en componente)
  // Por simplicidad, las añadimos al final
  return [
    ...staticItems,
    ...categoryItems
  ];
};

/**
 * Filtra el menú por roles del usuario
 * @param {Array} userRoles - Roles del usuario autenticado
 * @returns {Array} - Items visibles por rol
 */
export const getHeaderMenuByRole = (userRoles = []) => {
  const roles = Array.isArray(userRoles) ? userRoles : [];

  return headerMenuItems.filter(item =>
    item.roles.includes('all') || item.roles.some(r => roles.includes(r))
  );
};

/**
 * Filtra el menú por roles Y permisos
 * @param {Array} userRoles - Roles del usuario
 * @param {Array} userPermissions - Permisos del usuario
 * @returns {Array} - Items visibles
 */
export const getHeaderMenuByPermission = (userRoles = [], userPermissions = []) => {
  const permissions = Array.isArray(userPermissions) ? userPermissions : [];
  const menuByRole = getHeaderMenuByRole(userRoles);

  return menuByRole.filter(item =>
    !item.permission || permissions.includes(item.permission)
  );
};
