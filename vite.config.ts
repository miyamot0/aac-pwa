import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import manifest from './public/manifest.json'
import package_json from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*'],
                cleanupOutdatedCaches: true,
                sourcemap: false
            },
            devOptions: {
                enabled: true
            },
            // @ts-expect-error - VitePWA types are incorrect
            manifest: { ...manifest }
        })
    ],
    define: {
        BUILD_DATE: JSON.stringify(new Date().toLocaleDateString('en-US')),
        BUILD_VERSION: JSON.stringify(package_json.version)
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})
