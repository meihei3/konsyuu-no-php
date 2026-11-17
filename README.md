# 今週のPHP（Re） — GitHub Pages サイト

Astro 製の静的ブログ。Markdown 原稿（`src/content/posts/*.md`）を置くだけで、記事一覧・記事ページ・RSS・sitemap・llms.txt / llms-full.txt・JSON-LD 付きで公開される。

## 公開先（Ema の決定 2026-11-16）

- ホスティング: GitHub Pages のみ（自前サーバーには置かない）
- ドメイン: 独自ドメイン https://weekly-php.meihei.dev/（Ema が 2026-11-17 に決定。Cloudflare の CNAME: weekly-php → meihei3.github.io、プロキシオフ。旧 URL https://meihei3.github.io/konsyuu-no-php/ からは新ドメインへ転送される）
- リポジトリ名: `konsyuu-no-php`（Ema が 2026-11-16 に作成した実際の名前）

## 公開までの手順

1. GitHub で公開リポジトリ `konsyuu-no-php` を新規作成する（空でよい）。Ema が 2026-11-16 に作成済み。
2. この `site/` ディレクトリの中身をそのまま push する（`main` ブランチ）。
3. リポジトリの Settings → Pages → Build and deployment の Source を **GitHub Actions** にする。
4. push されると `.github/workflows/deploy.yml` がビルドして Pages にデプロイする。https://weekly-php.meihei.dev/ で確認できる。
5. push 用の認証は、そのリポジトリだけに効く fine-grained PAT（contents: write）を Ema に用意してもらう。今の Muse の GitHub 接続は読み取り専用・2リポジトリ限定なので、このリポジトリへの push はその PAT が必要。

## 毎週の運用

- 毎週月曜のレポート生成と同時に、Markdown を `src/content/posts/YYYY-MM-DD.md` として追加して push するだけ（frontmatter: `title` / `pubDate` / `description`（結論先出しの要約）/ `tags`）。
- 記事の書き方は週次レポートのルールと同じ：要約＋噛み砕いた説明＋「感想：」を各項目に入れる。初回記事 `2026-11-16.md` がそのまま手本になる。

## ローカル確認

```sh
npm install
npm run dev     # http://localhost:4321/
npm run build   # dist/ に静的ファイル一式
```

## 含まれているもの

| もの | 場所 |
| --- | --- |
| 記事一覧 / 記事ページ | `src/pages/index.astro`, `src/pages/posts/[...slug].astro` |
| JSON-LD（BlogPosting）・OGP・canonical | `src/layouts/BaseLayout.astro` |
| sitemap | `@astrojs/sitemap`（`sitemap-index.xml`） |
| RSS | `src/pages/rss.xml.ts` |
| llms.txt / llms-full.txt | `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts` |
| robots.txt（AI クローラー許可・sitemap 記載） | `public/robots.txt` |
| Pages デプロイ | `.github/workflows/deploy.yml` |
