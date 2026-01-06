// resources/js/Layouts/2026/Home/HomeLayout.jsx
import React from 'react';
import Header from './Components/Header';
import HeroCarousel from './Components/HeroCarousel';
import FeaturesSection from './Components/FeaturesSection';
import FeaturedProductsSlider from './Components/FeaturedProductsSlider';
import ProductsGridSection from './Components/ProductsGridSection';
import Footer from './Components/Footer';

const HomeLayout = ({ children, user }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <main>
        <HeroCarousel />
        <FeaturesSection />
        <FeaturedProductsSlider />
        <ProductsGridSection />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
