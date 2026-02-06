import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use base path for production (GitHub Pages), but not for development
export default defineConfig(({ command, mode }) => {
  // Always use base path for GitHub Pages deployment
  const base = command === 'build' ? '/club7fitness/' : '/'
  
  return {
    plugins: [react()],
    base: base,
    server: {
      port: 3000,
      open: true
    }
  }
})

