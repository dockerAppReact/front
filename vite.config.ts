import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true, 
    port: 5173, // Port exposé par le conteneur
    strictPort: true, // S'assurer que le port est fixe
  },
})