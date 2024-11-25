import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
      dirs: ['src/stores'],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // host: '0.0.0.0',
    // https: 'true',
    port: 8080,
    proxy: {
      '/api/library/search': {
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/library\/search/, ''),
        secure: false,
        target: 'https://openlibrary.org/search.json',
      }
    }
  },
  test: {
    coverage: {
      perFile: true,
      provider: 'v8',
    },
    include: ['test/**/*.spec.ts'],
    environment: 'happy-dom',
    globals: true,
    setupFile: 'tests/setup.ts'
  }
});
