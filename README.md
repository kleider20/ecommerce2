# 🌐 ecommerce2 – Plataforma de Comercio Electrónico Multinivel

> Sistema de comercio electrónico en Laravel con roles diferenciados (proveedores, vendedores, compradores), gestión jerárquica de categorías, soporte multimoneda (VES, USD, EUR, COP) y modelo de reparto de ingresos.

![Laravel](https://img.shields.io/badge/Laravel-10.x-FF2D20?logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-8.2%2B-777BB4?logo=php&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)
![Inertia.js](https://img.shields.io/badge/Inertia.js-1.x-FF6F00?logo=inertia&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## 📌 Descripción

**ecommerce2** es una plataforma de e-commerce multiusuario desarrollada en **Laravel + React + Inertia.js**, diseñada para:

- 🧑‍💼 **Proveedores**: registrar productos y gestionar su catálogo.
- 🛍️ **Vendedores**: promocionar y vender productos, ganando una comisión por cada venta.
- 👥 **Compradores**: comprar con descuentos según su nivel de suscripción.
- 💰 **Modelo de reparto**: ingresos compartidos entre proveedor, vendedor, plataforma y (opcionalmente) el comprador.
- 🇻🇪 **Soporte para Venezuela**: configuración dinámica de moneda (VES con símbolo **Bs.**), formato numérico (`,.`, ej: `1.000,00`), y tasa BCV.
- 📊 **Estadísticas**: proveedores ven reportes de ventas según su plan de suscripción.

La aplicación opera bajo un **sistema de configuración global** (`GlobalConfig`) que permite cambiar país, moneda, impuestos y lenguaje desde el panel del superadmin.

## 🚀 Características Clave

- ✅ **Categorías y subcategorías ilimitadas** (árboles jerárquicos)
- ✅ **Roles y permisos**: proveedor, vendedor, comprador, superadmin
- ✅ **Moneda dinámica**: precios se convierten al instante según país del comprador
- ✅ **Formato numérico venezolano**: `1.000,00 Bs.`
- ✅ **Validación robusta y formularios reactivos**
- ✅ **Interfaz moderna**: TailwindCSS + Lucide React + diseño responsivo
- ✅ **SEO optimizado**: meta títulos y descripciones por categoría

## 🛠️ Requisitos

- PHP >= 8.2
- Composer
- Node.js >= 18
- npm
- MySQL / MariaDB
- Git

## 📦 Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/kleider20/ecommerce2.git
   cd ecommerce2
