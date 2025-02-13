import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const res = await fetch(`https://synapslimited.eu/api/posts/${slug}`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    return {
      title: 'Post Not Found',
      description: 'We could not find the requested post.',
    };
  }

  const post = await res.json();

  // If the post title exceeds 40 characters, truncate and add "..."
  const MAX_TITLE_LENGTH = 40;
  const truncatedTitle =
    post.title.length > MAX_TITLE_LENGTH
      ? post.title.slice(0, MAX_TITLE_LENGTH) + '...'
      : post.title;

  const fullTitle = `${truncatedTitle}`;
  const imageUrl = post.thumbnail || '/assets/Blog-default.webp';

  // Remove HTML tags from description
  const plainDescription = stripHtml(post.description);
  // Truncate description after 80 words
  const truncatedDescription = truncateWords(plainDescription, 40);

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
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function DynamicLayout({
  children,
  params,
}: LayoutProps) {
  await params; // Use params if needed
  return <>{children}</>;
}
