// // resources/js/Layouts/AutoLayoutResolver.jsx
// import React, { lazy, Suspense, useEffect, useState } from 'react';
// import { usePage } from '@inertiajs/react';

// // ✅ Usamos la misma lógica de resolveLayout pero integrada
// const AutoLayoutResolver = ({ children }) => {
//   const { props } = usePage();
//   const {
//     auth,
//     currentPageName,
//     pageLayouts = {},
//     pagePermissions = {},
//     pageRoles = {},
//     userRole = 'guest'
//   } = props;

//   const [LayoutComponent, setLayoutComponent] = useState(() => () => (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="animate-pulse">Cargando...</div>
//     </div>
//   ));

//   useEffect(() => {
//     // ✅ Obtener layout desde configuración
//     const layoutPath = pageLayouts[currentPageName] || 'BaseLayout';

//     // ✅ Verificar acceso por rol y permiso
//     const hasRoleAccess = !pageRoles[currentPageName] || pageRoles[currentPageName] === userRole;
//     const hasPermissionAccess = !pagePermissions[currentPageName] ||
//       (auth?.user?.permissions?.includes(pagePermissions[currentPageName]));

//     let finalLayoutPath = layoutPath;
//     if (!hasRoleAccess || !hasPermissionAccess) {
//       finalLayoutPath = 'BaseLayouts/AccessDeniedLayout';
//     }

//     // ✅ Validar ruta segura (reutilizamos tu lógica)
//     if (!/^[a-zA-Z0-9\/_-]+$/.test(finalLayoutPath)) {
//       console.error('Ruta de layout inválida:', finalLayoutPath);
//       finalLayoutPath = 'GuestLayout';
//     }

//     // ✅ Cargar layout dinámicamente
//     const loadLayout = async () => {
//       try {
//         const module = await import(/* @vite-ignore */ `@/Layouts/${finalLayoutPath}`);
//         setLayoutComponent(() => module.default);
//       } catch (error) {
//         console.error(`Layout no encontrado: ${finalLayoutPath}`, error);
//         const fallback = await import('@/Layouts/GuestLayout');
//         setLayoutComponent(() => fallback.default);
//       }
//     };

//     loadLayout();
//   }, [currentPageName, pageLayouts, pageRoles, pagePermissions, userRole, auth]);

//   return (
//     <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando layout...</div>}>
//       <LayoutComponent user={auth?.user}>
//         {children}
//       </LayoutComponent>
//     </Suspense>
//   );
// };

// export default AutoLayoutResolver;


// // resources/js/Layouts/AutoLayoutResolver.jsx
// import React, { Suspense, useEffect, useState } from 'react';
// import { usePage } from '@inertiajs/react';

// /**
//  * Constantes de layouts predefinidos
//  *
//  * Estas constantes centralizan todas las rutas de layouts.
//  * Si necesitas cambiar un layout por defecto, solo edita aquí.
//  */
// const BASE_LAYOUT_DEFAULT = 'BaseLayout';        // Layout genérico para páginas sin configuración específica
// const ACCESS_DENIED_LAYOUT = 'BaseLayouts/AccessDeniedLayout'; // Layout mostrado cuando el usuario no tiene acceso
// const GUEST_LAYOUT = 'GuestLayout';                // Layout para usuarios no autenticados o como fallback de seguridad

// const AutoLayoutResolver = ({ children }) => {
//   const { props } = usePage();
//   const {
//     auth,
//     currentPageName,
//     pageLayouts = {},
//     pagePermissions = {},
//     pageRoles = {},
//     userRole = 'guest'
//   } = props;

//   const [LayoutComponent, setLayoutComponent] = useState(() => () => (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="animate-pulse text-gray-500">Cargando layout...</div>
//     </div>
//   ));

//   useEffect(() => {
//     // ✅ Determinar el layout base para la página actual
//     // Usa el layout configurado o el layout por defecto
//     const layoutPath = pageLayouts[currentPageName] || BASE_LAYOUT_DEFAULT;

//     // ✅ Verificar acceso por rol y permiso
//     const hasRoleAccess = !pageRoles[currentPageName] || pageRoles[currentPageName] === userRole;
//     const hasPermissionAccess = !pagePermissions[currentPageName] ||
//       (auth?.user?.permissions?.includes(pagePermissions[currentPageName]));

//     let finalLayoutPath = layoutPath;

//     // ✅ Si no tiene acceso, usar layout de acceso denegado
//     if (!hasRoleAccess || !hasPermissionAccess) {
//       finalLayoutPath = ACCESS_DENIED_LAYOUT;
//     }

//     // ✅ Validar ruta segura (protección contra inyección de rutas)
//     if (!/^[a-zA-Z0-9\/_-]+$/.test(finalLayoutPath)) {
//       console.error('Ruta de layout inválida:', finalLayoutPath);
//       finalLayoutPath = GUEST_LAYOUT; // Fallback seguro
//     }

//     // ✅ Cargar layout dinámicamente
//     const loadLayout = async () => {
//       try {
//         const module = await import(/* @vite-ignore */ `@/Layouts/${finalLayoutPath}`);
//         setLayoutComponent(() => module.default);
//       } catch (error) {
//         console.error(`Layout no encontrado: ${finalLayoutPath}`, error);
//         // ✅ Fallback de emergencia: siempre usar GUEST_LAYOUT si falla la carga
//         const fallback = await import(/* @vite-ignore */ `@/Layouts/${GUEST_LAYOUT}`);
//         setLayoutComponent(() => fallback.default);
//       }
//     };

//     loadLayout();
//   }, [currentPageName, pageLayouts, pageRoles, pagePermissions, userRole, auth]);

//   return (
//     <Suspense fallback={
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-pulse text-gray-500">Cargando layout...</div>
//       </div>
//     }>
//       <LayoutComponent user={auth?.user}>
//         {children}
//       </LayoutComponent>
//     </Suspense>
//   );
// };

// export default AutoLayoutResolver;


// // resources/js/Layouts/AutoLayoutResolver.jsx
// import React, { Suspense, useEffect, useState } from 'react';
// import { usePage } from '@inertiajs/react';

// // ✅ Importa el registro generado automáticamente
// import { layoutRegistry } from '@/Layouts/layoutRegistry';

// const AutoLayoutResolver = ({ children }) => {
//   const { props } = usePage();
//   const {
//     auth,
//     currentPageName,
//     pageLayouts = {},
//     pagePermissions = {},
//     pageRoles = {},
//     userRole = 'guest'
//   } = props;

//   const [LayoutComponent, setLayoutComponent] = useState(() => () => (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="animate-pulse text-gray-500">Cargando layout...</div>
//     </div>
//   ));

//   useEffect(() => {
//     // ✅ Debug dentro del componente (correcto)
//     console.log('🔍 Página actual detectada:', currentPageName);
//     console.log('📦 Configuración de layouts:', pageLayouts);
//     console.log('🎯 Layout esperado para esta página:', pageLayouts[currentPageName]);

//     // ✅ Obtener layout desde configuración
//     const layoutPath = pageLayouts[currentPageName] || 'BaseLayout';

//     // ✅ Verificar acceso
//     const hasRoleAccess = !pageRoles[currentPageName] || pageRoles[currentPageName] === userRole;
//     const hasPermissionAccess = !pagePermissions[currentPageName] ||
//       (auth?.user?.permissions?.includes(pagePermissions[currentPageName]));

//     let finalLayoutPath = layoutPath;
//     if (!hasRoleAccess || !hasPermissionAccess) {
//       finalLayoutPath = 'BaseLayout'; // Usa BaseLayout como fallback
//     }

//     // ✅ Cargar layout desde el registro
//     const loadLayout = async () => {
//       try {
//         if (layoutRegistry[finalLayoutPath]) {
//           const module = await layoutRegistry[finalLayoutPath]();
//           setLayoutComponent(() => module.default);
//         } else {
//           console.error(`❌ Layout no registrado: ${finalLayoutPath}`);
//           // Fallback a BaseLayout si existe
//           if (layoutRegistry['BaseLayout']) {
//             const fallback = await layoutRegistry['BaseLayout']();
//             setLayoutComponent(() => fallback.default);
//           }
//         }
//       } catch (error) {
//         console.error(`💥 Error al cargar layout ${finalLayoutPath}:`, error);
//         // Fallback de emergencia
//         if (layoutRegistry['BaseLayout']) {
//           const fallback = await layoutRegistry['BaseLayout']();
//           setLayoutComponent(() => fallback.default);
//         }
//       }
//     };

//     loadLayout();
//   }, [currentPageName, pageLayouts, pageRoles, pagePermissions, userRole, auth]);

//   return (
//     <Suspense fallback={
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-pulse text-gray-500">Cargando layout...</div>
//       </div>
//     }>
//       <LayoutComponent user={auth?.user}>
//         {children}
//       </LayoutComponent>
//     </Suspense>
//   );
// };

// export default AutoLayoutResolver;


// // resources/js/Layouts/AutoLayoutResolver.jsx
// import React, { Suspense, useEffect, useState } from 'react';
// import { usePage } from '@inertiajs/react';
// import { layoutRegistry } from '@/Layouts/layoutRegistry';

// const AutoLayoutResolver = ({ children }) => {
//   const { props } = usePage();
//   const {
//     auth,
//     currentPageName,
//     pageLayouts = {},
//     pagePermissions = {},
//     pageRoles = {},
//     userRole = 'guest'
//   } = props;

//   const [LayoutComponent, setLayoutComponent] = useState(() => () => (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="animate-pulse text-gray-500">Cargando layout...</div>
//     </div>
//   ));

//   useEffect(() => {
//     console.log('🚀 Iniciando carga de layout...');
//     console.log('currentPageName:', currentPageName);
//     console.log('layoutRegistry keys:', Object.keys(layoutRegistry));

//     const layoutPath = pageLayouts[currentPageName] || 'BaseLayout';
//     console.log('Layout path seleccionado:', layoutPath);

//     const hasRoleAccess = !pageRoles[currentPageName] || pageRoles[currentPageName] === userRole;
//     const hasPermissionAccess = !pagePermissions[currentPageName] ||
//       (auth?.user?.permissions?.includes(pagePermissions[currentPageName]));

//     let finalLayoutPath = layoutPath;
//     if (!hasRoleAccess || !hasPermissionAccess) {
//       finalLayoutPath = 'BaseLayout';
//     }

//     console.log('Layout final a cargar:', finalLayoutPath);
//     console.log('¿Está en el registro?', layoutRegistry[finalLayoutPath] !== undefined);

//     const loadLayout = async () => {
//       try {
//         if (layoutRegistry[finalLayoutPath]) {
//           console.log('✅ Cargando layout desde registro...');
//           const module = await layoutRegistry[finalLayoutPath]();
//           console.log('✅ Layout cargado exitosamente');
//           setLayoutComponent(() => module.default);
//         } else {
//           console.error('❌ Layout no encontrado en registro:', finalLayoutPath);
//           if (layoutRegistry['BaseLayout']) {
//             const fallback = await layoutRegistry['BaseLayout']();
//             setLayoutComponent(() => fallback.default);
//           }
//         }
//       } catch (error) {
//         console.error('💥 Error FATAL al cargar layout:', error);
//         console.error('Error stack:', error.stack);
//         // Forzar un layout de fallback visible
//         setLayoutComponent(() => () => (
//           <div className="min-h-screen bg-red-100 flex flex-col items-center justify-center p-8">
//             <h1 className="text-2xl font-bold text-red-800 mb-4">❌ ERROR DE LAYOUT</h1>
//             <p className="text-red-700 mb-2">No se pudo cargar el layout: {finalLayoutPath}</p>
//             <p className="text-red-600 text-sm">Revisa la consola para más detalles.</p>
//           </div>
//         ));
//       }
//     };

//     loadLayout();
//   }, [currentPageName, pageLayouts, pageRoles, pagePermissions, userRole, auth]);

//   return (
//     <Suspense fallback={
//       <div className="min-h-screen flex items-center justify-center bg-blue-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//           <p className="text-blue-700">Cargando layout dinámico...</p>
//           <p className="text-blue-600 text-sm mt-2">Layout: {pageLayouts[currentPageName] || 'BaseLayout'}</p>
//         </div>
//       </div>
//     }>
//       <LayoutComponent user={auth?.user}>
//         {children}
//       </LayoutComponent>
//     </Suspense>
//   );
// };

// export default AutoLayoutResolver;


// resources/js/Layouts/AutoLayoutResolver.jsx
import React, { Suspense, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { layoutRegistry } from '@/Layouts/layoutRegistry';

const AutoLayoutResolver = ({ children }) => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-gray-500">Cargando layout...</div>
    </div>
  ));

  useEffect(() => {


    // Descomenta estas lineas para Activar esta Opcione Para DEBUG
    console.log('🔍 Página actual:', currentPageName);
    console.log('📦 Configuración de layouts:', pageLayouts);
    console.log('🎯 Layout esperado:', pageLayouts[currentPageName]);
    console.log('👤 Rol del usuario:', userRole);
    console.log('🔑 Permisos del usuario:', auth?.user?.permissions);




    const layoutPath = pageLayouts[currentPageName] || 'BaseLayout';

    // Verificar acceso por rol y permiso
    const hasRoleAccess = !pageRoles[currentPageName] || pageRoles[currentPageName] === userRole;
    const hasPermissionAccess = !pagePermissions[currentPageName] ||
      (auth?.user?.permissions?.includes(pagePermissions[currentPageName]));

    let finalLayoutPath = layoutPath;
    if (!hasRoleAccess || !hasPermissionAccess) {
      finalLayoutPath = 'BaseLayout';
    }

    const loadLayout = async () => {
      try {
        if (layoutRegistry[finalLayoutPath]) {
          const module = await layoutRegistry[finalLayoutPath]();
          setLayoutComponent(() => module.default);
        } else {
          // Fallback a BaseLayout si el layout no está registrado
          if (layoutRegistry['BaseLayout']) {
            const fallback = await layoutRegistry['BaseLayout']();
            setLayoutComponent(() => fallback.default);
          }
        }
      } catch (error) {
        // Fallback de emergencia en caso de error
        if (layoutRegistry['BaseLayout']) {
          const fallback = await layoutRegistry['BaseLayout']();
          setLayoutComponent(() => fallback.default);
        }
      }
    };

    loadLayout();
  }, [currentPageName, pageLayouts, pageRoles, pagePermissions, userRole, auth]);

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mb-2"></div>
          <p className="text-gray-600 text-sm">Cargando layout...</p>
        </div>
      </div>
    }>
      <LayoutComponent user={auth?.user}>
        {children}
      </LayoutComponent>
    </Suspense>
  );
};

export default AutoLayoutResolver;
