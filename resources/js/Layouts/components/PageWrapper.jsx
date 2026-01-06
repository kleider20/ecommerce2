// // resources/js/Layouts/PageWrapper.jsx
// import React, { lazy, Suspense } from 'react';
// import { resolveLayout } from './LayoutResolver';
// import { usePage } from '@inertiajs/react';

// const PageWrapper = ({ children }) => {
//   const { props } = usePage();

//   const { auth, layoutYear = '2026', userRole = 'guest' } = props;

//   const LayoutComponent = lazy(resolveLayout(layoutYear, userRole));

//   return (
//     <Suspense fallback={
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         Cargando layout...
//       </div>
//     }>
//       <LayoutComponent user={auth?.user}>
//         {children}
//       </LayoutComponent>
//     </Suspense>
//   );
// };

// export default PageWrapper;


// // resources/js/Components/PageWrapper.jsx
// import React, { lazy, Suspense, useEffect, useState } from 'react';
// import { usePage } from '@inertiajs/react';
// import { resolveLayout } from '@/Layouts/LayoutResolver';

// const PageWrapper = ({ children, layoutType = 'dashboard' }) => {
//   const { props } = usePage();
//   const { auth, layoutConfigurations = {}, userRole = 'guest' } = props;

//   const [LayoutComponent, setLayoutComponent] = useState(() => () => (
//     <div className="min-h-screen flex items-center justify-center">Cargando layout...</div>
//   ));

//   useEffect(() => {
//     // Buscar layout específico: "dashboard_super_admin"
//     const specificKey = `${layoutType}_${userRole}`;
//     let layoutPath = layoutConfigurations[specificKey];

//     // Fallback: buscar layout genérico por tipo
//     if (!layoutPath) {
//       layoutPath = layoutConfigurations[layoutType];
//     }

//     // Fallback final: layout por defecto
//     if (!layoutPath) {
//       layoutPath = `2026/${layoutType}/User${layoutType.charAt(0).toUpperCase() + layoutType.slice(1)}Layout`;
//     }

//     const loader = resolveLayout(layoutPath);
//     setLayoutComponent(() => lazy(loader));
//   }, [layoutType, userRole, layoutConfigurations]);

//   return (
//     <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando layout...</div>}>
//       <LayoutComponent user={auth?.user}>
//         {children}
//       </LayoutComponent>
//     </Suspense>
//   );
// };

// export default PageWrapper;



// // resources/js/Components/PageWrapper.jsx
// import React, { lazy, Suspense, useEffect, useState } from 'react';
// import { usePage } from '@inertiajs/react';
// import { resolveLayout } from '@/Layouts/LayoutResolver';

// const PageWrapper = ({ children, pageName }) => {
//   const { props } = usePage();
//   const {
//     auth,
//     pageLayouts = {},
//     userRole = 'guest',
//     layoutConfigurations = {} // para fallbacks
//   } = props;

//   const [LayoutComponent, setLayoutComponent] = useState(() => () => (
//     <div className="min-h-screen flex items-center justify-center">Cargando...</div>
//   ));

//   useEffect(() => {
//     let layoutPath = null;

//     // ✅ 1. Buscar layout específico para esta página y rol
//     const specificKey = `${pageName}_${userRole}`;
//     layoutPath = pageLayouts[specificKey];

//     // ✅ 2. Buscar layout genérico para esta página
//     if (!layoutPath) {
//       layoutPath = pageLayouts[pageName];
//     }

//     // ✅ 3. Fallback: usar layout por tipo de página (del sistema anterior)
//     if (!layoutPath && layoutConfigurations) {
//       const layoutType = pageName.includes('Dashboard') ? 'dashboard' : 'page';
//       layoutPath = layoutConfigurations[`${layoutType}_${userRole}`] || layoutConfigurations[layoutType];
//     }

//     // ✅ 4. Fallback final
//     if (!layoutPath) {
//       layoutPath = 'BaseLayouts/GuestLayout';
//     }

//     const loader = resolveLayout(layoutPath);
//     setLayoutComponent(() => lazy(loader));
//   }, [pageName, userRole, pageLayouts, layoutConfigurations]);

//   return (
//     <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando layout...</div>}>
//       <LayoutComponent user={auth?.user}>
//         {children}
//       </LayoutComponent>
//     </Suspense>
//   );
// };

// export default PageWrapper;


import React, { lazy, Suspense, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { resolveLayout } from '../utils/LayoutResolver';

const PageWrapper = ({ children }) => {
  const { props } = usePage();
  const {
    auth,
    currentPageName,
    pageLayouts = {},
    pagePermissions = {},
    pageRoles = {},
    userRole = 'guest'
  } = props;

  const [LayoutComponent, setLayoutComponent] = useState(() => () => (
    <div className="min-h-screen flex items-center justify-center">Cargando layout...</div>
  ));

  useEffect(() => {
    // ✅ Obtener layout desde configuración
    let layoutPath = pageLayouts[currentPageName] || 'BaseLayouts/DefaultLayout';

    // ✅ Verificar acceso por rol
    const requiredRole = pageRoles[currentPageName];
    if (requiredRole && requiredRole !== userRole) {
      layoutPath = 'BaseLayouts/AccessDeniedLayout';
    }

    // ✅ Verificar acceso por permiso
    const requiredPermission = pagePermissions[currentPageName];
    if (requiredPermission && auth?.user?.permissions && !auth.user.permissions.includes(requiredPermission)) {
      layoutPath = 'BaseLayouts/AccessDeniedLayout';
    }

    // ✅ Cargar layout dinámicamente
    const loader = () => import(/* @vite-ignore */ `@/Layouts/${layoutPath}`)
      .catch(error => {
        console.error(`Layout no encontrado: ${layoutPath}`, error);
        return import('@/Layouts/BaseLayouts/GuestLayout');
      });

    setLayoutComponent(() => lazy(loader));
  }, [currentPageName, pageLayouts, pagePermissions, pageRoles, userRole, auth]);

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando layout...</div>}>
      <LayoutComponent user={auth?.user}>
        {children}
      </LayoutComponent>
    </Suspense>
  );
};

export default PageWrapper;
