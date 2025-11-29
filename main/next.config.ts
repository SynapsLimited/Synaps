// next.config.js
/*
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'nl', 'it', 'de', 'es'],
    defaultLocale: 'en',
    localeDetection: false, // Automatically detect and redirect based on user's language
  },
  images: {
    domains: [
      'ybuzolmlbfbjdvrv.public.blob.vercel-storage.com', // Add your image host here
      // Add other domains if needed
      // 'example.com',
      // 'images.unsplash.com',
    ],
    // Optional: Configure other image settings
    // formats: ['image/avif', 'image/webp'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'ybuzolmlbfbjdvrv.public.blob.vercel-storage.com',
    //     pathname: '/thumbnails/**',
    //   },
    // ],
  },
  // ...other configurations
};

*/

// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*', // Match all paths on your custom domain
        destination: 'https://goodness-video-913243.framer.app/:path*', // Route to your Framer domain
      },
    ];
  },
};
