import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mongoAssetsPlugin from './vite-plugin-mongo-assets.js';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // ── No proxy needed ──────────────────────────────────────────────────
        // The mongoAssetsPlugin intercepts /assets/* directly inside the Vite
        // dev server via configureServer, so no external backend is required.
      },
      plugins: [
        react(),
        tailwindcss(),
        // Embeds MongoDB GridFS asset serving into the Vite dev server.
        // Connects automatically using the Non-SRV URI from .env on first
        // request (or eagerly at startup) — no separate `node server.js` needed.
        mongoAssetsPlugin(),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        },
      },
    };
});
