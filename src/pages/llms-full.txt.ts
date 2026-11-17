import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

// llms-full.txt: 全記事の全文 (Markdown のまま)。
export const GET: APIRoute = async () => {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  const parts = ['# 今週のPHP（Re） — 全文', ''];
  for (const post of posts) {
    parts.push(`## ${post.data.title}`, '', post.body ?? '', '');
  }
  return new Response(parts.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
