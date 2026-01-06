// // resources/js/Pages/Users/UserDashboard.jsx
// import React, { lazy, Suspense } from 'react';
// import { resolveLayout } from '@/Layouts/LayoutResolver';

// const UserDashboard = ({ auth, layoutYear, userRole }) => {
//   // ✅ Ahora `layoutYear` viene desde Laravel
//   const LayoutComponent = lazy(resolveLayout(layoutYear, userRole));

//   return (
//     <Suspense fallback={<div>Cargando layout...</div>}>
//       <LayoutComponent user={auth.user}>
//         <h1>Bienvenido, {auth.user.name}!</h1>
//       </LayoutComponent>
//     </Suspense>
//   );
// };

// export default UserDashboard;


// resources/js/Pages/Users/UserDashboard.jsx
import React, { useState } from 'react';
import { Package, CreditCard, Clock, Heart, MapPin } from 'lucide-react';
import AutoLayoutResolver from '@/Layouts/AutoLayoutResolver';

// Componentes reutilizables (sin lazy si los usas en dashboard)
import StatCard from '@/Layouts/components/StatCard';
import QuickActionCard from '@/Layouts/components/QuickActionCard';

const UserDashboard = ({
  stats,
  notifications: initialNotifications = []
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const quickActionItems = [
    { label: 'Seguimiento', icon: Package },
    { label: 'Favoritos', icon: Heart },
    { label: 'Direcciones', icon: MapPin },
    { label: 'Pago', icon: CreditCard },
  ];

  return (
    <AutoLayoutResolver>
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Pedidos Totales" value={stats?.totalOrders || 0} icon={Package} />
          <StatCard title="Gastado Total" value={`$${stats?.totalSpent || '0'}`} icon={CreditCard} />
          <StatCard title="Pedidos Pendientes" value={stats?.pendingOrders || 0} icon={Clock} />
          <StatCard title="En Lista de Deseos" value={stats?.wishlistItems || 0} icon={Heart} />
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActionItems.map((action, index) => (
              <QuickActionCard key={index} icon={action.icon} label={action.label} />
            ))}
          </div>
        </div>

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold">Pedidos Recientes</h2>
            <p className="text-gray-600">Aquí se mostrarán tus pedidos recientes.</p>
          </div>
        )}
      </div>
    </AutoLayoutResolver>
  );
};

export default UserDashboard;
