// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are filled in automatically by the GitHub Actions
// workflow (.github/workflows/deploy.yml). With a custom domain, BASE_PATH is
// empty and SITE_URL becomes https://your-domain. Locally you can ignore both.
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
