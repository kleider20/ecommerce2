// resources/js/Layouts/PageWrapper.jsx
import React, { lazy, Suspense } from 'react';
import { resolveLayout } from './LayoutResolver';
import { usePage } from '@inertiajs/react';

const PageWrapper = ({ children }) => {
  const { props } = usePage();

  const { auth, layoutYear = '2026', userRole = 'guest' } = props;

  const LayoutComponent = lazy(resolveLayout(layoutYear, userRole));

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        Cargando layout...
      </div>
    }>
      <LayoutComponent user={auth?.user}>
        {children}
      </LayoutComponent>
    </Suspense>
  );
};

export default PageWrapper;
