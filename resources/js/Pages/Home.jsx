// resources/js/Pages/Home.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AutoLayoutResolver from '@/Layouts/AutoLayoutResolver';

const Home = ({
  products = [],
  globalConfig = {},
  availableCountries = []
}) => {

    const { props } = usePage();
    const { currentPageName, pageLayouts } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const [cartItems, setCartItems] = useState(0);
    const [wishlistItems, setWishlistItems] = useState(0);

  const featuredProducts = useMemo(() =>
    products.filter(product => product.featured), [products]
  );

  return (
    <AutoLayoutResolver>
      <Head title="ShopNova - Tienda Online 2026" />

      <main>
        <p>Pagina Home</p>
      </main>

      {/* Contenido independiente y reutilizable */}

    </AutoLayoutResolver>
  );
};

export default Home;
