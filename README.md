# 今週のPHP（Re） — GitHub Pages サイト

Astro 製の静的ブログ。`src/content/posts/*.md` に Markdown 原稿を置くだけで、記事一覧・記事ページ・RSS・sitemap・llms.txt / llms-full.txt・JSON-LD 付きで公開される。

## 公開先

- ホスティング: GitHub Pages のみ
- ドメイン: https://weekly-php.meihei.dev/（Cloudflare の CNAME: weekly-php → meihei3.github.io、プロキシオフ。旧 URL https://meihei3.github.io/konsyuu-no-php/ からは新ドメインへ転送される）
- デプロイ: `main` への push で `.github/workflows/deploy.yml` がビルド・公開する（Pages の Source は GitHub Actions）
- push には、このリポジトリだけに効く fine-grained PAT（Contents / Pull requests / Workflows の読み書き）が必要

## 毎週の運用

- 記事は `src/content/posts/YYYY-MM-DD.md` に追加する（frontmatter: `title` / `pubDate` / `description` / `tags`）
- 各項目は「要約＋噛み砕いた説明＋感想：」で書く。初回記事 `2026-11-16.md` が手本
- ブランチ: 記事だけの変更は `article/`、仕組みの変更は `feature/`。どちらも PR 経由で `main` にマージする

## ローカル確認

```sh
npm install
npm run dev     # http://localhost:4321/
npm run build   # dist/ に静的ファイル一式
```

## 含まれているもの

| もの | 場所 |
| --- | --- |
| トップ / 記事一覧 / 記事ページ | `src/pages/index.astro`, `src/pages/posts/` |
| JSON-LD・OGP・canonical | `src/layouts/BaseLayout.astro` |
| sitemap | `@astrojs/sitemap`（`sitemap-index.xml`） |
| RSS | `src/pages/rss.xml.ts` |
| llms.txt / llms-full.txt | `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts` |
| robots.txt | `public/robots.txt` |
| Pages デプロイ | `.github/workflows/deploy.yml` |
