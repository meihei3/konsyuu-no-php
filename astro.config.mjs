// GitHub Pages + 独自ドメイン — Ema の決定 (2026-11-17):
// ホスティングは GitHub Pages のみ、ドメインは weekly-php.meihei.dev。
// リポジトリ名は konsyuu-no-php（Ema が 2026-11-16 に作成）。
// 独自ドメインではサイトがルートで公開されるため base は '/'。
// ドメインを変える場合は site と public/CNAME と robots.txt の Sitemap を一緒に変える。
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://weekly-php.meihei.dev',
  base: '/',
  integrations: [sitemap()],
});
