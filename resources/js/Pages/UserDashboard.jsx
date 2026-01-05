// resources/js/Pages/Users/UserDashboard.jsx
import React, { lazy, Suspense } from 'react';
import { resolveLayout } from '@/Layouts/LayoutResolver';

const UserDashboard = ({ auth, layoutYear, userRole }) => {
  // Cargar layout dinámicamente
  const LayoutComponent = lazy(() => resolveLayout(layoutYear, userRole));

  return (
    <Suspense fallback={<div>Cargando layout...</div>}>
      <LayoutComponent user={auth.user}>
        {/* Tu contenido específico de la página */}
        <h1>Bienvenido, {auth.user.name}!</h1>
      </LayoutComponent>
    </Suspense>
  );
};

export default UserDashboard;
