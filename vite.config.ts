import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves this repo at /Prototype/. Local dev stays at /.
const pagesBase = process.env.VITE_PAGES_BASE ?? '/'

export default defineConfig({
  base: pagesBase,
  plugins: [react(), tailwindcss()],
})
