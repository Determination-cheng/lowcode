import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import path from 'path'

export default defineConfig({
  root: path.resolve(__dirname, './src/vue'),
  base: path.resolve(__dirname, './src'),
  alias: { '@': path.resolve(__dirname, './src') },
  plugins: [vue(), vueJSX()],
})
