import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Pre-render all blog post slugs by fetching from the API
export async function generateStaticParams() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`https://www.synapslimited.eu/api/posts`, { cache: 'no-cache' });
  if (!res.ok) return [];
  const posts = await res.json();
  return posts.map((post: any) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const res = await fetch(`https://www.synapslimited.eu/api/posts/${slug}`, { cache: 'no-cache' });
  if (res.status === 404) {
    notFound();
  }
  const post = await res.json();
  const MAX_TITLE_LENGTH = 40;
  const truncatedTitle =
    post.title.length > MAX_TITLE_LENGTH ? post.title.slice(0, MAX_TITLE_LENGTH) + '...' : post.title;
  const fullTitle = `${truncatedTitle}`;
  const imageUrl = post.thumbnail || '/assets/Blog-default.webp';
  const plainDescription = stripHtml(post.description);
  const truncatedDescription = truncateWords(plainDescription, 80);
  return {
    title: fullTitle,
    description: truncatedDescription,
    openGraph: {
      title: fullTitle,
      description: truncatedDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}

function truncateWords(text: string, wordLimit: number): string {
  const words = text.split(/\s+/);
  return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function DynamicLayout({ children, params }: LayoutProps) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await params;
  return <>{children}</>;
}
