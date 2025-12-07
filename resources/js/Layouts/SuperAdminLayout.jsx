// resources/js/Layouts/SuperAdmin/SuperAdminLayout.jsx
import React, { useState } from 'react';
import { usePage, Head } from '@inertiajs/react';
import Sidebar from '@/Components/SuperAdminLayout/Sidebar';
import TopBar from '@/Components/SuperAdminLayout/TopBar';

const SuperAdminLayout = ({ title, children }) => {
    const { url } = usePage(); // Para depurar o usar si es necesario
    const { appName } = usePage().props;
    const { site_name, favicon_url, logo_url } = usePage().props.system;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
    <Head title={title ? `${title} - ${appName}` : appName}>
        {favicon_url && <link rel="icon" href={favicon_url} />}
    </Head>

    {/* <header>
        <h1>{site_name}</h1>
      {logo_url ? (
        <img src={logo_url} alt={site_name} className="h-10" />
      ) : (
        <span className="text-xl font-bold">{site_name}</span>
      )}
    </header> */}

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <TopBar
        onMenuClick={() => setSidebarOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="flex">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar ya no necesita activeTab ni onTabChange */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 pt-20">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
    </>
  );
};

export default SuperAdminLayout;
