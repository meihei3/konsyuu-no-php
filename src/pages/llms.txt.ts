import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

// llms.txt: AI 向けの記事一覧 (Ema の要望: llms.txt 対応)。
export const GET: APIRoute = async ({ site }) => {
  const base =
    (site?.toString() ?? 'https://weekly-php.meihei.dev/').replace(/\/$/, '') +
    import.meta.env.BASE_URL.replace(/\/$/, '');
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const lines = [
    '# 今週のPHP internals',
    '',
    '> php.internals の過去1週間の議論を、RFCに限らず日本語で噛み砕いてまとめる週次レポート。',
    '',
    '## 記事一覧',
    '',
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${base}/posts/${post.id.replace(/\.md$/, '')}/): ${post.data.description}`,
    ),
    '',
    '## 全文',
    '',
    '- 全文は llms-full.txt を参照: ' + base + '/llms-full.txt',
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
