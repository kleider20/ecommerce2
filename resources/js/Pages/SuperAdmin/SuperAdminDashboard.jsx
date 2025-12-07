// resources/js/Pages/SuperAdmin/DashboardPage.jsx
import React from 'react';
import {
  DollarSign, Building2, Users, CreditCard,
  TrendingUp, Clock, Shield, Activity, BarChart3
} from 'lucide-react';
import SuperAdminLayout from '@/Layouts/SuperAdminLayout';

const DashboardPage = () => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const stats = [
    { title: 'Ingresos Totales', value: '$2.45M', change: '+15.2%', icon: DollarSign, color: 'from-emerald-500 to-teal-600' },
    { title: 'Tiendas Activas', value: '1,245', change: '+8.7%', icon: Building2, color: 'from-blue-500 to-cyan-600' },
    { title: 'Usuarios Totales', value: '167,284', change: '+12.3%', icon: Users, color: 'from-purple-500 to-fuchsia-600' },
    { title: 'Transacciones', value: '45,678', change: '+6.9%', icon: CreditCard, color: 'from-orange-500 to-amber-600' }
  ];

  const recentActivities = [
    { id: 1, type: 'store', message: 'Nueva tienda registrada', time: '2 min', store: 'TechStore México' },
    { id: 2, type: 'user', message: 'Nuevo administrador aprobado', time: '15 min', user: 'Carlos López' },
    { id: 3, type: 'payment', message: 'Comisión procesada', time: '1 hora', amount: '$2,450.99' },
    { id: 4, type: 'review', message: 'Nueva reseña de plataforma', time: '2 horas', rating: 5 }
  ];

  const platformStats = [
    { name: 'E-commerce', value: '45%', growth: '+12%', color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Marketplace', value: '30%', growth: '+8%', color: 'bg-blue-100 text-blue-800' },
    { name: 'Retail', value: '15%', growth: '+5%', color: 'bg-purple-100 text-purple-800' },
    { name: 'Servicios', value: '10%', growth: '+3%', color: 'bg-orange-100 text-orange-800' }
  ];

  const StatCard = ({ stat }) => (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
          <stat.icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <TrendingUp className="h-4 w-4 text-emerald-600" />
        <span className="text-sm text-emerald-600 font-medium ml-2">{stat.change}</span>
      </div>
    </div>
  );

  return (
    <SuperAdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Super Administrador</h1>
        {/* <p className="text-gray-600">{currentDate}</p> */}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Platform Stats */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Distribución por Plataforma</h2>
          <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1">
            <span>Ver detalles</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformStats.map((stat, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{stat.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${stat.color}`}>
                  {stat.growth}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.color.replace('bg-', 'from-').replace(' text', ' to')}`}
                  style={{ width: stat.value }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Actividad Reciente</h2>
          <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1">
            <span>Ver todo</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center">
                  {activity.type === 'store' && <Building2 className="h-5 w-5 text-emerald-600" />}
                  {activity.type === 'user' && <Users className="h-5 w-5 text-purple-600" />}
                  {activity.type === 'payment' && <CreditCard className="h-5 w-5 text-emerald-600" />}
                  {activity.type === 'review' && <TrendingUp className="h-5 w-5 text-orange-600" />}
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="font-medium text-gray-900">{activity.message}</p>
                {(activity.store || activity.user || activity.amount) && (
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.store || activity.user || activity.amount}
                  </p>
                )}
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auditoría */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Sistema de Auditoría</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: 'Seguridad', desc: 'Monitoreo continuo de amenazas y vulnerabilidades' },
            { icon: Activity, title: 'Rendimiento', desc: 'Análisis de métricas y optimización del sistema' },
            { icon: BarChart3, title: 'Analítica', desc: 'Reportes detallados y predicciones de tendencias' }
          ].map((item, i) => (
            <div key={i} className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default DashboardPage;
