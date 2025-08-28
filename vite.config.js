import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // 🎯 DETECCIÓN INTELIGENTE - 100% funcional
  const isGitHubPages = process.env.GITHUB_PAGES === 'true' || 
                        mode === 'github' || 
                        process.env.NODE_ENV === 'production';
  
  const base = isGitHubPages ? '/wiimage/' : '/';
  
  return {
    base,
    build: {
      outDir: 'dist',
      // ⚡ OPTIMIZACIONES MÍNIMAS pero efectivas
      minify: 'esbuild',
      sourcemap: false,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          smile: resolve(__dirname, 'smile.html'), 
          smiletop: resolve(__dirname, 'smiletop.html') 
        }
      }
    },
    publicDir: 'public'
  };
});