// resources/js/Layouts/2026/Home/Components/FeaturedProductsSlider.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/Components/2026/HomeLayout/ProductCard';

const FeaturedProductsSlider = ({ products = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const visibleProducts = 4;
  const totalSlides = Math.max(0, products.length - visibleProducts + 1);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Productos Destacados</h2>
            <p className="text-gray-600">Los más populares y mejor valorados</p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
            Ver todos <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / visibleProducts)}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="w-1/4 flex-shrink-0 px-2">
                  <ProductCard product={product} isFeatured={true} />
                </div>
              ))}
            </div>
          </div>

          {products.length > visibleProducts && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSlider;
