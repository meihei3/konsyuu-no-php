import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  return rss({
    title: '今週のPHP internals',
    description: 'php.internals の過去1週間の議論を、RFCに限らず日本語で噛み砕いてまとめる週次レポート。',
    site: context.site ?? 'https://meihei3.github.io/',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // link は base 付きで渡す (site だけでは /konsyuu-no-php/ が付かないため)。
      link: `${import.meta.env.BASE_URL}posts/${post.id.replace(/\.md$/, '')}/`,
    })),
  });
};
