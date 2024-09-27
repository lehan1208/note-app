import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [],
        include: [
          'node_modules/draft-js/**',
          'node_modules/fbjs/**',
        ],
      },
    }),
  ],
  define: {
    global: 'window',
  },
  build: {
    rollupOptions: {
      external: ['graphql'],
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  optimizeDeps: {
    include: ['draft-js'],
  },
})
