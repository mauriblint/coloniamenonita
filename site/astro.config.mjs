import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://coloniamenonita.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  image: { layout: 'constrained' },
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
});
