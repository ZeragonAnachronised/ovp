import '../css/app.css';
import './bootstrap';
import ReactDOM from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {route } from "ziggy-js";

createInertiaApp({
  resolve: (name) => {
    return resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    );
  },
  setup({ el, App, props }) {
    ReactDOM.createRoot(el).render(<App {...props} />);
  },
});
