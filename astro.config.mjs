import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://krapac.cz',
  trailingSlash: 'always',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'import',
            'global-builtin',
            'if-function',
            'color-functions',
            'elseif',
            'new-global',
          ],
        },
      },
    },
  },
  integrations: [react(), sitemap()],
});
