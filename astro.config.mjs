// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.argentinasgoldenvisa.com',
  integrations: [
    sitemap({
      filter(page) {
        const path = new URL(page).pathname;
        return !path.startsWith('/api/') && !path.startsWith('/admin/');
      },
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === '/') {
          item.changefreq = 'weekly';
          item.priority = 1;
        } else if (
          path.startsWith('/visa/') ||
          path.startsWith('/guides/') ||
          path.startsWith('/real-estate/')
        ) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        } else if (path === '/visa-options' || path === '/citizenship' || path === '/real-estate') {
          item.changefreq = 'monthly';
          item.priority = 0.9;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.6;
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});