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

  // Truncate title after 40 characters and append "..."
  const MAX_TITLE_LENGTH = 40;
  const truncatedTitle =
    post.title.length > MAX_TITLE_LENGTH
      ? post.title.slice(0, MAX_TITLE_LENGTH) + '...'
      : post.title;

  const fullTitle = `${truncatedTitle}`;
  const imageUrl = post.thumbnail || '/assets/Blog-default.webp';

  return {
    title: fullTitle,
    description: post.description,
    openGraph: {
      title: fullTitle,
      description: post.description,
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

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function DynamicLayout({
  children,
  params,
}: LayoutProps) {
  // Await params if you need to use them here
  const resolvedParams = await params;
  // You can use resolvedParams.slug if needed

  return <>{children}</>;
}
