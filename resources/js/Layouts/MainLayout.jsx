// resources/js/Layouts/MainLayout.jsx
import React from 'react';
import Header from '@/Components/MainLayout/Header';
import Footer from '@/Components/MainLayout/Footer';

const MainLayout = ({ children, globalConfig, onSearchChange, searchTerm }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        globalConfig={globalConfig}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
