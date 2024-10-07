import react from '@vitejs/plugin-react';
import path from 'path';
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
    resolve: {
        alias: {
            models: path.resolve(__dirname, 'src/models'),
            ui: path.resolve(__dirname, 'src/components/ui'),
            container: path.resolve(__dirname, 'src/components/container'),
            hooks: path.resolve(__dirname, 'src/hooks'),
            utils: path.resolve(__dirname, 'src/utils'),
        },
    },
});
