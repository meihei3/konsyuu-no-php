// GitHub Pages + 独自ドメイン（weekly-php.meihei.dev）で公開する。
// 独自ドメインではサイトがルートで公開されるため base は '/'。
// ドメインを変える場合は site と public/CNAME と robots.txt の Sitemap を一緒に変える。
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// 記事の pubDate を sitemap の lastmod に使う（ファイル名 = 公開日）。
const postsDir = new URL('./src/content/posts/', import.meta.url);
const lastmodByPath = new Map();
let latestPostDate = null;
for (const file of readdirSync(postsDir)) {
  if (!file.endsWith('.md')) continue;
  const text = readFileSync(new URL(file, postsDir), 'utf8');
  const match = text.match(/^pubDate:\s*(\d{4}-\d{2}-\d{2})/m);
  if (!match) continue;
  const date = new Date(`${match[1]}T00:00:00+09:00`);
  lastmodByPath.set(`/posts/${file.replace(/\.md$/, '')}/`, date);
  if (!latestPostDate || date > latestPostDate) latestPostDate = date;
}
// トップと記事一覧は新しい記事が出るたびに変わるので、最新記事の公開日を lastmod にする。
if (latestPostDate) {
  lastmodByPath.set('/', latestPostDate);
  lastmodByPath.set('/posts/', latestPostDate);
}

export default defineConfig({
  site: 'https://weekly-php.meihei.dev',
  base: '/',
  integrations: [
    sitemap({
      serialize(item) {
        const lastmod = lastmodByPath.get(new URL(item.url).pathname);
        if (lastmod) item.lastmod = lastmod.toISOString();
        return item;
      },
    }),
  ],
});
