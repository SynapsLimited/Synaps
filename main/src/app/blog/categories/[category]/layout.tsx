import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  // Await the async params to extract the category value
  const { category } = await params;

  // Define metadata title and description based on the category
  const title = `${category} - Category Blog - Synaps Limited`;
  const description = `Explore the latest posts, trends, and insights in ${category}. Stay updated with our curated content on ${category}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: '/assets/Synaps-Meta.png', // Use a default image or update with a category-specific image if available
          width: 1200,
          height: 630,
          alt: category,
        },
      ],
    },
  };
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}

export default async function CategoryLayout({ children, params }: LayoutProps) {
  // Await the params to satisfy the type constraint
  await params;
  return <>{children}</>;
}
