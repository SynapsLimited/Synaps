// app/dashboard/[id]/page.tsx

import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserFromToken, getPostsByUser } from '@/lib/serverUtils';
import DashboardContent from '@/app/dashboard/DashboardContent'; // Adjust the path as needed
import '@/app/css/blog.css';

// Define the props for the dynamic route.
interface DashboardPageProps {
  params: Promise<{ id: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  // Await the params to extract the id.
  const { id } = await params;

  // Get cookies (server side)
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  // If no token exists, render a friendly message.
  if (!token) {
    return (
      <section className="dashboard">
        <div className="container">
          <p>
            You must be logged in to view your dashboard. Please <Link href="/login">login</Link>.
          </p>
        </div>
      </section>
    );
  }

  // Get the current user from the token.
  const currentUser = await getUserFromToken(token);
  if (!currentUser) {
    return (
      <section className="dashboard">
        <div className="container">
          <p>
            Your session is invalid. Please <Link href="/login">login</Link> again.
          </p>
        </div>
      </section>
    );
  }

  // Check that the logged-in user matches the dashboard URL parameter.
  if (currentUser.id !== id) {
    return (
      <section className="dashboard">
        <div className="container">
          <p>You are not authorized to view this dashboard.</p>
        </div>
      </section>
    );
  }

  // Fetch posts for the authenticated user.
  const posts = await getPostsByUser(id);

  // Pass the fetched user and posts to the client component for rendering.
  return <DashboardContent currentUser={currentUser} posts={posts} />;
}
