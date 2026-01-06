// resources/js/Layouts/2026/Users/UserDashboardLayout.jsx
import React from 'react';
import UserHeader from './components/UserHeader';
import UserSidebar from './components/UserSidebar';

const UserDashboardLayout = ({
  children,
  user,
  activeTab,
  onTabChange,
  notifications = [],
  onMarkNotificationAsRead,
  unreadNotifications = 0,
  userPermissions = [],
}) => (
  <div className="min-h-screen bg-gray-50">
    <UserHeader
      user={user}
      notifications={notifications}
      unreadNotifications={unreadNotifications}
      onMarkNotificationAsRead={onMarkNotificationAsRead}
    />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <UserSidebar
            user={user}
            activeTab={activeTab}
            onTabChange={onTabChange}
            userPermissions={userPermissions}
          />
        </div>
        <div className="lg:col-span-3">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default UserDashboardLayout;
