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

  // Remove HTML tags from description for OG metadata
  const plainDescription = stripHtml(post.description);

  return {
    title: fullTitle,
    description: plainDescription,
    openGraph: {
      title: fullTitle,
      description: plainDescription,
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

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function DynamicLayout({
  children,
  params,
}: LayoutProps) {
  await params; // or use if needed
  return <>{children}</>;
}
