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
      // Cases is the canonical dashboard route. Old "demand-letters" path
      // and the old wizard path stay as 301 redirects in case anything
      // external still points at them.
      { source: "/dashboard/demand-letters", destination: "/dashboard/cases", permanent: true },
      { source: "/dashboard/demand-letters/:path*", destination: "/dashboard/cases/:path*", permanent: true },
      { source: "/demand-letter/wizard/:id", destination: "/case/:id/build", permanent: true },
      { source: "/demand-letter/wizard/:id/:step*", destination: "/case/:id/build/:step*", permanent: true },
      // Landlord issue pages were flattened from /small-claims/landlord/<slug>
      // to /small-claims/sue-landlord-<slug>. 301 the old URLs so any external
      // backlinks transfer SEO juice to the new path.
      {
        source: "/small-claims/landlord/:issue",
        destination: "/small-claims/sue-landlord-:issue",
        permanent: true,
      },
      {
        source: "/small-claims/employer/:issue",
        destination: "/small-claims/sue-employer-:issue",
        permanent: true,
      },
      {
        source: "/small-claims/contractor/:issue",
        destination: "/small-claims/sue-contractor-:issue",
        permanent: true,
      },
      {
        source: "/small-claims/auto/:issue",
        destination: "/small-claims/sue-auto-:issue",
        permanent: true,
      },
      {
        source: "/small-claims/neighbor/:issue",
        destination: "/small-claims/sue-neighbor-:issue",
        permanent: true,
      },
      {
        source: "/small-claims/personal-loan/:issue",
        destination: "/small-claims/sue-loan-:issue",
        permanent: true,
      },
      {
        source: "/small-claims/roommate/:issue",
        destination: "/small-claims/sue-roommate-:issue",
        permanent: true,
      },
      {
        source: "/small-claims/online-seller/:issue",
        destination: "/small-claims/sue-seller-:issue",
        permanent: true,
      },
      {
        source: "/small-claims/refund/:issue",
        destination: "/small-claims/sue-refund-:issue",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/small-claims/sue-landlord-:issue",
        destination: "/small-claims/landlord/:issue",
      },
      {
        source: "/small-claims/sue-employer-:issue",
        destination: "/small-claims/employer/:issue",
      },
      {
        source: "/small-claims/sue-contractor-:issue",
        destination: "/small-claims/contractor/:issue",
      },
      {
        source: "/small-claims/sue-auto-:issue",
        destination: "/small-claims/auto/:issue",
      },
      {
        source: "/small-claims/sue-neighbor-:issue",
        destination: "/small-claims/neighbor/:issue",
      },
      {
        source: "/small-claims/sue-loan-:issue",
        destination: "/small-claims/personal-loan/:issue",
      },
      {
        source: "/small-claims/sue-roommate-:issue",
        destination: "/small-claims/roommate/:issue",
      },
      {
        source: "/small-claims/sue-seller-:issue",
        destination: "/small-claims/online-seller/:issue",
      },
      {
        source: "/small-claims/sue-refund-:issue",
        destination: "/small-claims/refund/:issue",
      },
    ];
  },
};

export default nextConfig;
