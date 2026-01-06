// resources/js/Pages/Dashboard/Dashboard.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import AutoLayoutResolver from '@/Layouts/AutoLayoutResolver';

// ✅ Importa todos los componentes específicos
import SuperAdminDashboard from '@/Pages/Dashboard/SuperAdminDashboard';
import UserDashboard from '@/Pages/Dashboard/UserDashboard';
import ProviderDashboard from '@/Pages/Dashboard/ProviderDashboard';
import SellerDashboard from '@/Pages/Dashboard/SellerDashboard';
import AdvertiserDashboard from '@/Pages/Dashboard/AdvertiserDashboard';

const Dashboard = (props) => {
  const { userRole } = props;

  // ✅ Mapa de componentes por rol
  const roleComponents = {
    'super_admin': SuperAdminDashboard,
    'user': UserDashboard,
    'proveedor': ProviderDashboard,
    'vendedor': SellerDashboard,
    'anunciante': AdvertiserDashboard,
    'comprador': UserDashboard // Usa el mismo que user
  };

  // ✅ Obtiene el componente para el rol actual
  const RoleDashboardComponent = roleComponents[userRole] || UserDashboard;

  return (
    <AutoLayoutResolver>
      <Head title="Dashboard" />
        <main>
        {/* ✅ Renderiza solo el componente específico del rol */}
        <RoleDashboardComponent {...props} />
      </main>
    </AutoLayoutResolver>
  );
};

export default Dashboard;
