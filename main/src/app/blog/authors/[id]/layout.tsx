import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // Await the params to get the actual id value
  const { id } = await params;
  
  // Fetch author details from your API
  const res = await fetch(`https://synapslimited.eu/api/users/${id}`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    return {
      title: 'Author Not Found',
      description: 'We could not find the requested author.',
    };
  }

  const author = await res.json();

  // Create the metadata title using the author's name
  const title = `${author.name} - Author Blog - Synaps Limited`;

  // For description, use the author's bio (if available), stripping out any HTML
  // and truncating it after 80 words; otherwise, use a default string.
  const rawBio = author.bio || `${author.name} shares insights and articles on various topics.`;
  const description = truncateWords(stripHtml(rawBio), 80);

  // Use the author avatar for the OG image or a default avatar
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

// Helper function to remove HTML tags from a string
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}

// Helper function to truncate text after a given number of words
function truncateWords(text: string, wordLimit: number): string {
  const words = text.split(/\s+/);
  return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function AuthorLayout({ children, params }: LayoutProps) {
  // Await params if you need to use them; here, we simply render the children
  await params;
  return <>{children}</>;
}
