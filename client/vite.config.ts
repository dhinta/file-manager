import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 80,
    },
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
});
