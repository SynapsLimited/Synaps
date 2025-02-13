import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const VALID_CATEGORIES = [
  'Marketing',
  'Business',
  'Technology',
  'AI',
  'Gaming',
  'Product',
  'Entertainment'
];

export async function generateStaticParams() {
  // Pre-render only allowed categories
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  // If not a valid category, trigger 404
  if (!VALID_CATEGORIES.includes(category)) {
    notFound();
  }
  
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
          url: '/assets/Synaps-Meta.png',
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
  // Simulate delay before rendering children
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await params;
  return <>{children}</>;
}
