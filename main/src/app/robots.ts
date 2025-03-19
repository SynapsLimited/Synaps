import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/login",
          "/logout",
          "/dashboard",      // excludes any /dashboard/[id] pages
          "/profile",        // excludes any /profile/[id] pages
          "/blog/create",
          "/blog/*/edit",    // pattern to exclude any /blog/[slug]/edit page
          "/register",
          "/privacypolicy"
        ],
      },
    ],
    sitemap: `https://www.synapslimited.eu/sitemap.xml`,
  };
}
