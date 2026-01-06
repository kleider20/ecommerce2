// // resources/js/Layouts/LayoutResolver.js

// // ✅ Define explícitamente cada layout soportado
// const layoutMap = {
//   '2026': {
//     Users: () => import('./2026/Users/UserDashboardLayout'),
//     SuperAdmin: () => import('@/Layouts/SuperAdminLayout'),
//     // Provider: () => import('./2026/Provider/ProviderLayout.jsx'),
//     // Seller: () => import('./2026/Seller/SellerLayout.jsx'),
//     // Advertiser: () => import('./2026/Advertiser/AdvertiserLayout.jsx'),
//   }
//   // Añade '2027', etc., aquí en el futuro
// };

// export const resolveLayout = (year, role) => {
//   // Mapeo de roles de Laravel a nombres de carpeta
//   const roleToFolder = {
//     user: 'Users',
//     // super_admin: 'SuperAdmin',
//     // comprador: 'Users',
//     // proveedor: 'Provider',
//     // vendedor: 'Seller',
//     // anunciante: 'Advertiser'
//   };

//   const folderName = roleToFolder[role] || 'Users';

//   // ✅ Devuelve la función de import() explícita
//   return layoutMap[year]?.[folderName] || layoutMap['2026'].Users;
// };


// // resources/js/Layouts/LayoutResolver.js
// const layoutMap = {
//   '2026': {
//     user: () => import('./2026/UserLayout/UserDashboardLayout'),
//     super_admin: () => import('@/Layouts/SuperAdminLayout'),
//     // super_admin: () => import('@/Layouts/SuperAdminLayout'),
//     // proveedor: () => import('./2026/Provider/ProviderLayout'),
//     // vendedor: () => import('./2026/Seller/SellerLayout'),
//     // anunciante: () => import('./2026/Advertiser/AdvertiserLayout'),
//     // Layout base para invitados o roles no mapeados
//     guest: () => import('./GuestLayout'),
//   }
// };

// export const resolveLayout = (year, role) => {
//   const roleMap = {
//     user: 'user',
//     comprador: 'user',
//     super_admin: 'user',
//     proveedor: 'proveedor',
//     vendedor: 'vendedor',
//     anunciante: 'anunciante',
//   };

//   const folderName = roleMap[role] || 'guest';

//   return layoutMap[year]?.[folderName] || layoutMap['2026'].guest;
// };


// resources/js/Layouts/LayoutResolver.js
const layoutCache = new Map();

export const resolveLayout = (layoutPath) => {
  if (layoutCache.has(layoutPath)) {
    return layoutCache.get(layoutPath);
  }

  // Validar ruta segura (evitar inyección de rutas)
  if (!/^[a-zA-Z0-9\/_-]+$/.test(layoutPath)) {
    console.error('Ruta de layout inválida:', layoutPath);
    return () => import('@/Layouts/GuestLayout');
  }

  const importPath = `@/Layouts/${layoutPath}`;
  const loader = () => import(/* @vite-ignore */ importPath)
    .catch(error => {
      console.error(`Layout no encontrado: ${layoutPath}`, error);
      return import('@/Layouts/GuestLayout');
    });

  layoutCache.set(layoutPath, loader);
  return loader;
};
