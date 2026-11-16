// GitHub Pages (project site) — Ema の決定 (2026-11-16):
// ホスティングは GitHub Pages のみ、ドメインはデフォルト (meihei3.github.io) のまま。
// リポジトリ名 konsyuu-no-php は Ema が 2026-11-16 13:16 JST に作成した実際の名前。変える場合は site と base を一緒に変える。
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // site はドメインのルート、base がリポジトリ名。site に base を含めると
  // canonical や RSS の URL が二重になるので分けて書く。
  site: 'https://meihei3.github.io',
  base: '/konsyuu-no-php/',
  integrations: [sitemap()],
});
