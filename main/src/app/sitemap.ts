// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { getAuthors } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    "https://www.synapslimited.eu";

  // --- Static Routes ---
  const staticRoutes = [
    "", // Home page
    "about",
    "blog",
    "portfolio",
    "posts",
    "services",
    "contact",
  ];
  const staticEntries = staticRoutes.map((route) => ({
    url: route === "" ? `${baseUrl}/` : `${baseUrl}/${route}`,
    lastModified: new Date(),
  }));

  // --- Hardcoded Dynamic Routes ---
  // Services
  const serviceSlugs = ["webdesign", "appdesign", "socialmedia", "branding", "video", "advertisement"];
  const serviceEntries = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
  }));

  // Portfolio
  const portfolioSlugs = ["webdesign", "appdesign", "socialmedia", "branding", "video", "advertisement"];
  const portfolioEntries = portfolioSlugs.map((slug) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    lastModified: new Date(),
  }));

  // Categories
  const categories = ["Marketing", "Business", "Technology", "AI", "Gaming", "Product", "Entertainment"];
  const categoryEntries = categories.map((cat) => ({
    url: `${baseUrl}/blog/categories/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
  }));

  // --- Dynamic Routes: Authors ---
  let authorEntries: MetadataRoute.Sitemap = [];
  try {
    const authors = await getAuthors();
    authorEntries = authors.map((author: any) => ({
      url: `${baseUrl}/blog/authors/${author._id || author.id}`,
      lastModified: new Date(),
    }));
  } catch (error) {
    console.error("Error fetching authors for sitemap:", error);
  }

  // --- Dynamic Routes: Posts ---
  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const resPosts = await fetch(`${baseUrl}/api/posts`, { cache: "no-cache" });
    if (resPosts.ok) {
      const posts = await resPosts.json();
      postEntries = posts.map((post: any) => {
        const displaySlug =
          post.slug && post.slug.trim().length > 0 ? post.slug : (post._id || post.id);
        return {
          url: `${baseUrl}/blog/posts/${displaySlug}`,
          lastModified: new Date(post.updatedAt || post.createdAt || Date.now()),
          changeFrequency: "",
          priority: "",
        };
      });
    }
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error);
  }

  // --- Combine All Entries ---
  const sitemapEntries: MetadataRoute.Sitemap = [
    ...staticEntries,
    ...serviceEntries,
    ...portfolioEntries,
    ...categoryEntries,
    ...authorEntries,
    ...postEntries,
  ];

  return sitemapEntries;
}
