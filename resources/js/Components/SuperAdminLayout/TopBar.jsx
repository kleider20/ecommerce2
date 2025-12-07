// resources/js/Layouts/SuperAdmin/TopBar.jsx
import React, { useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import TopBarNotifications from '@/Components/SuperAdminLayout/TopBarNotifications';

const TopBar = ({ onMenuClick, searchTerm, onSearchChange }) => {

  const { auth } = usePage().props;
  const user = auth?.user;
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });


  if (!user) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-2xl">
      <div className="flex items-center justify-between px-6 h-20">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800">
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex-1 max-w-2xl mx-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar en toda la plataforma..."
              className="w-full pl-12 pr-4 py-3 text-sm bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-right">
            <p className="text-xs text-gray-400">Hoy</p>
            <p className="text-sm font-semibold text-white">
              {currentDate}
            </p>
          </div>

          <div
            className="relative group"
            onMouseEnter={() => setIsNotificationOpen(true)}
            onMouseLeave={() => setIsNotificationOpen(false)}
          >
            <button className="p-3 text-gray-300 hover:text-white relative bg-gray-800 hover:bg-gray-700 rounded-xl">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">6</span>
            </button>
            {isNotificationOpen && <TopBarNotifications />}
          </div>

          {/* Avatar del usuario */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:inline text-white text-sm font-medium">{user.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
