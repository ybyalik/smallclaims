/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
    // Don't bundle the headless-Chromium + puppeteer-core packages into the
    // serverless function — they have native binaries and large file trees
    // that need to be loaded at runtime instead.
    serverComponentsExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // Old URL pattern from before "Cases" was renamed to "Demand letter".
      // Permanent so existing bookmarks and Stripe success_urls keep working.
      { source: "/dashboard/cases", destination: "/dashboard/demand-letters", permanent: true },
      { source: "/dashboard/cases/:path*", destination: "/dashboard/demand-letters/:path*", permanent: true },
      // Landlord issue pages were flattened from /small-claims/landlord/<slug>
      // to /small-claims/sue-landlord-<slug>. 301 the old URLs so any external
      // backlinks transfer SEO juice to the new path.
      {
        source: "/small-claims/landlord/:issue",
        destination: "/small-claims/sue-landlord-:issue",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // The actual route handler still lives at /small-claims/landlord/[issue].
      // This rewrite serves the same handler when users hit the new flatter
      // /small-claims/sue-landlord-<slug> URL while the browser keeps showing
      // the new URL. Redirect above sends old URL traffic here first.
      {
        source: "/small-claims/sue-landlord-:issue",
        destination: "/small-claims/landlord/:issue",
      },
    ];
  },
};

export default nextConfig;
