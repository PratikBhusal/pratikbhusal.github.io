import path from "path"
import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import { presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    Unocss({
      presets: [
        presetUno()
      ],
    }),
    // Unocss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "/@": path.resolve(__dirname, "./src"),
    },
  },
  base: '',
  root: path.resolve(__dirname, "./src/pages"),
  build: {
    minify: false,
    // emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "./src/pages/index.html")
      },
    },
    outDir: path.resolve(__dirname, "./dist"),
  },
})
