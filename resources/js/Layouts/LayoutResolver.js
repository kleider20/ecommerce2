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


// resources/js/Layouts/LayoutResolver.js
const layoutMap = {
  '2026': {
    user: () => import('./2026/UserLayout/UserDashboardLayout'),
    super_admin: () => import('@/Layouts/SuperAdminLayout'),
    // super_admin: () => import('@/Layouts/SuperAdminLayout'),
    // proveedor: () => import('./2026/Provider/ProviderLayout'),
    // vendedor: () => import('./2026/Seller/SellerLayout'),
    // anunciante: () => import('./2026/Advertiser/AdvertiserLayout'),
    // Layout base para invitados o roles no mapeados
    guest: () => import('./GuestLayout'),
  }
};

export const resolveLayout = (year, role) => {
  const roleMap = {
    user: 'user',
    comprador: 'user',
    super_admin: 'user',
    proveedor: 'proveedor',
    vendedor: 'vendedor',
    anunciante: 'anunciante',
  };

  const folderName = roleMap[role] || 'guest';

  return layoutMap[year]?.[folderName] || layoutMap['2026'].guest;
};
