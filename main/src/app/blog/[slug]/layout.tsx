import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Replace the URL below with your actual API endpoint.
  const res = await fetch(`https://synapslimited.eu/api/posts/${params.slug}`, {
    cache: 'no-cache', // Adjust caching as needed.
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

  // Append your site suffix
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

export default function DynamicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
