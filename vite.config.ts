/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Vue Star Rating Input',
      fileName: (format) => `rating-input.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // The library exposes both a default and a named export; declaring the
        // mode explicitly silences Rollup's UMD named/default-mix warning.
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
    cssCodeSplit: true,
  },
  plugins: [
    vue(),
    libInjectCss(),
    dts({
      include: ['src/index.ts', 'src/components/**/*.vue', 'src/composables/**/*.ts', 'src/types/**/*.ts'],
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.spec.ts'],
  },
})
