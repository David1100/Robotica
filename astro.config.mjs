// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from "@astrojs/react";

import icon from 'astro-icon';
import path from 'path';
// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    }
  }
});