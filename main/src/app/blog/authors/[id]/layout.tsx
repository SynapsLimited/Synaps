import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // Pre-render author IDs from API
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`https://synapslimited.eu/api/users`, { cache: 'no-cache' });
  if (!res.ok) return [];
  const authors = await res.json();
  return authors.map((author: any) => ({ id: author._id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`https://synapslimited.eu/api/users/${id}`, { cache: 'no-cache' });
  if (res.status === 404) {
    notFound();
  }
  const author = await res.json();
  const title = `${author.name} - Author Blog - Synaps Limited`;
  const rawBio = author.bio || `${author.name} shares insights and articles on various topics.`;
  const description = truncateWords(stripHtml(rawBio), 80);
  const imageUrl = author.avatar || '/assets/Avatar-default.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: author.name,
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
  params: Promise<{ id: string }>;
}

export default async function AuthorLayout({ children, params }: LayoutProps) {
  // Simulate delay before rendering children
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await params;
  return <>{children}</>;
}
