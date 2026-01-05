import '../css/app.css';
import './bootstrap';

// ✅ Importar Flag Icons desde node_modules
import 'flag-icons/css/flag-icons.min.css';

// 👇 Importa react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import { PrimeReactProvider } from 'primereact/api'; // ← necesarios

// Laravel Echo + Pusher
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    forceTLS: true,
    encrypted: true,
});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    // title: (title) => `${title} - ${appName}`,
    title: (title) => title || 'Mi Tienda',
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        /* root.render(<App {...props} />); */
        root.render(
            <PrimeReactProvider value={{ unstyled: false }}>
                <App {...props} />

                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </PrimeReactProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
