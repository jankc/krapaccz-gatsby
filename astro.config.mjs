import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://krapac.cz',
  trailingSlash: 'always',
  integrations: [react(), sitemap()],
});
