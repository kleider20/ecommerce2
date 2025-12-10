// resources/js/Pages/HomePage.jsx
import React, { useState, useMemo } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import SidebarFilters from '@/Components/MainLayout/SidebarFilters';
import ProductGrid from '@/Components/MainLayout/ProductGrid';
import FeaturesSection from '@/Components/MainLayout/FeaturesSection';
import { formatCurrency } from '@/utils/formatCurrency';

const HomePage = ({ products, userConfig }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [sortBy, setSortBy] = useState('popularidad');

  /* const products = [
    // (tu lista de productos se mantiene igual)
    {
      id: 1,
      name: "Laptop Gaming ASUS ROG",
      price: 1299.99,
      originalPrice: 1499.99,
      rating: 4.8,
      reviews: 124,
      category: "computadoras",
      image: "https://placehold.co/300x300/3b82f6/white?text=Laptop",
      description: "Potente laptop gaming con RTX 4070 y procesador Intel Core i9",
      inStock: true
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      price: 1199.99,
      originalPrice: 1299.99,
      rating: 4.9,
      reviews: 289,
      category: "celulares",
      image: "https://placehold.co/300x300/10b981/white?text=iPhone",
      description: "El iPhone más avanzado con cámara profesional",
      inStock: true
    },
    {
      id: 3,
      name: "Monitor 4K 27\" LG",
      price: 349.99,
      originalPrice: 399.99,
      rating: 4.6,
      reviews: 87,
      category: "monitores",
      image: "https://placehold.co/300x300/8b5cf6/white?text=Monitor",
      description: "Monitor 4K con HDR y 144Hz para gaming y productividad",
      inStock: true
    },
    {
      id: 4,
      name: "Teclado Mecánico RGB",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviews: 156,
      category: "accesorios",
      image: "https://placehold.co/300x300/ef4444/white?text=Teclado",
      description: "Teclado mecánico con switches Cherry MX y retroiluminación RGB",
      inStock: false
    },
    {
      id: 5,
      name: "Tablet Samsung Galaxy Tab",
      price: 449.99,
      originalPrice: 499.99,
      rating: 4.7,
      reviews: 93,
      category: "tablets",
      image: "https://placehold.co/300x300/f59e0b/white?text=Tablet",
      description: "Tablet con S Pen y pantalla AMOLED de 11 pulgadas",
      inStock: true
    },
    {
      id: 6,
      name: "Audífonos Sony WH-1000XM5",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.9,
      reviews: 201,
      category: "audio",
      image: "https://placehold.co/300x300/06b6d4/white?text=Audífonos",
      description: "Audífonos con cancelación de ruido líder en la industria",
      inStock: true
    },
    {
      id: 7,
      name: "Mouse Gaming Logitech G502",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.7,
      reviews: 178,
      category: "accesorios",
      image: "https://placehold.co/300x300/8b5cf6/white?text=Mouse",
      description: "Mouse gaming con DPI ajustable y 11 botones programables",
      inStock: true
    },
    {
      id: 8,
      name: "Smartwatch Apple Watch Series 9",
      price: 399.99,
      originalPrice: 429.99,
      rating: 4.8,
      reviews: 145,
      category: "relojes",
      image: "https://placehold.co/300x300/3b82f6/white?text=Smartwatch",
      description: "Smartwatch con GPS, ECG y resistencia al agua",
      inStock: true
    },
    {
      id: 9,
      name: "Impresora HP LaserJet",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.4,
      reviews: 67,
      category: "impresoras",
      image: "https://placehold.co/300x300/f97316/white?text=Impresora",
      description: "Impresora láser rápida y eficiente para oficina",
      inStock: true
    },
    {
      id: 10,
      name: "Disco Duro Externo 2TB",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.6,
      reviews: 123,
      category: "almacenamiento",
      image: "https://placehold.co/300x300/84cc16/white?text=Disco",
      description: "Almacenamiento portátil de alta velocidad con USB 3.0",
      inStock: true
    },
    {
      id: 11,
      name: "Router WiFi 6 TP-Link",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.5,
      reviews: 89,
      category: "redes",
      image: "https://placehold.co/300x300/06b6d4/white?text=Router",
      description: "Router de última generación con cobertura de hasta 2500 sq ft",
      inStock: true
    },
    {
      id: 12,
      name: "Cámara DSLR Canon EOS",
      price: 699.99,
      originalPrice: 799.99,
      rating: 4.8,
      reviews: 156,
      category: "camaras",
      image: "https://placehold.co/300x300/be185d/white?text=Cámara",
      description: "Cámara profesional con sensor APS-C de 24.1MP",
      inStock: true
    },
    {
      id: 13,
      name: "Reloj Digital",
      price: 699.99,
      originalPrice: 799.99,
      rating: 4.8,
      reviews: 156,
      category: "relojes",
      image: "https://placehold.co/300x300/be185d/white?text=Reloj",
      description: "Reloj Profesional",
      inStock: true
    }
  ]; */

    const categories = useMemo(() => {
        // Filtrar productos con categoría válida
        const validProducts = products.filter(p => p.category && p.category.name);

        // Obtener categorías únicas
        const uniqueCategories = [...new Set(validProducts.map(p => p.category.name))];

        return [
            { id: 'todos', name: 'Todos los Productos', count: validProducts.length },
            ...uniqueCategories.map(catName => ({
            id: catName,
            name: catName.charAt(0).toUpperCase() + catName.slice(1),
            count: validProducts.filter(p => p.category.name === catName).length
            })).sort((a, b) => a.name.localeCompare(b.name))
        ];
    }, [products]);

    const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    let filtered = products.filter(p => {
        // Verificar que la categoría exista
        const hasValidCategory = p.category && p.category.name;
        const inCategory = selectedCategory === 'todos' ||
                        (hasValidCategory && p.category.name === selectedCategory);

        if (!inCategory) return false;
        if (!term) return true;

        return (
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
        );
    });

    return [...filtered].sort((a, b) => {
        switch (sortBy) {
        case 'precio-asc': return a.price_usd - b.price_usd;
        case 'precio-desc': return b.price_usd - a.price_usd;
        case 'calificacion': return (b.rating || 0) - (a.rating || 0);
        default: return (b.reviews || 0) - (a.reviews || 0);
        }
    });
    }, [searchTerm, selectedCategory, sortBy, products]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('todos');
  };

  return (
    <MainLayout
      userConfig={userConfig}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <SidebarFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
          <div className="flex-1">
            <ProductGrid
              products={filteredProducts}
              selectedCategory={selectedCategory}
              categories={categories}
              onClearFilters={handleClearFilters}
              userConfig={userConfig}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>
      <FeaturesSection />
    </MainLayout>
  );
};

export default HomePage;


