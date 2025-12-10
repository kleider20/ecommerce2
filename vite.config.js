import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],

    // server: {
    //     host: 'ecommerce.test', // ← tu dominio local
    //     hmr: {
    //         host: 'ecommerce.test'
    //     },
    //     // Esto hace que Vite use HTTPS (con el certificado de Laragon/Valet)
    //     https: true
    // }
});
