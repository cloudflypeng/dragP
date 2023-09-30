import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true,
  },
  build:{
    lib:{
      entry:'src/lib/index.js',
      name:'drag-p',
      fileName:'index'
    },
    rollupOptions:{
      external:['react','react-dom'],
      
    }
  }
})
