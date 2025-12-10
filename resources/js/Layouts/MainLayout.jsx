// resources/js/Layouts/MainLayout.jsx
import React from 'react';
import { usePage, Head } from '@inertiajs/react';
import Header from '@/Components/MainLayout/Header';
import Footer from '@/Components/MainLayout/Footer';

const MainLayout = ({ title, children, globalConfig, onSearchChange, searchTerm }) => {
    const { appName } = usePage().props;
    const { site_name, favicon_url, logo_url } = usePage().props.system;

  return (
    <>
    <Head title={title ? `${title} - ${appName}` : appName}>
        {favicon_url && <link rel="icon" href={favicon_url} />}
    </Head>

    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        globalConfig={globalConfig}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
    </>
  );

};

export default MainLayout;
