import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://caiohenrique.dev',
  integrations: [tailwind({ applyBaseStyles: false }), mdx(), sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    domains: [],
  },
});
