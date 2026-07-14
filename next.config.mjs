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
      // CANONICAL URLs for issue pages are /small-claims/sue-<category>-<slug>.
      // The directory shape /small-claims/<category>/<slug> exists only as a
      // file-system convenience and is 301'd to the canonical slug to keep
      // SEO and inbound backlinks on the slug form they've always had.
      { source: "/small-claims/landlord/:issue", destination: "/small-claims/sue-landlord-:issue", permanent: true },
      { source: "/small-claims/employer/:issue", destination: "/small-claims/sue-employer-:issue", permanent: true },
      { source: "/small-claims/contractor/:issue", destination: "/small-claims/sue-contractor-:issue", permanent: true },
      { source: "/small-claims/auto/:issue", destination: "/small-claims/sue-auto-:issue", permanent: true },
      { source: "/small-claims/neighbor/:issue", destination: "/small-claims/sue-neighbor-:issue", permanent: true },
      { source: "/small-claims/personal-loan/:issue", destination: "/small-claims/sue-loan-:issue", permanent: true },
      { source: "/small-claims/roommate/:issue", destination: "/small-claims/sue-roommate-:issue", permanent: true },
      { source: "/small-claims/online-seller/:issue", destination: "/small-claims/sue-seller-:issue", permanent: true },
      { source: "/small-claims/refund/:issue", destination: "/small-claims/sue-refund-:issue", permanent: true },
    ];
  },
  async headers() {
    // Baseline security headers on every response. We deliberately avoid a
    // full Content-Security-Policy here (it would need careful allowlisting for
    // Stripe, Google Maps, fonts, etc. and could break checkout), but these
    // three are safe and close the biggest gaps: clickjacking (framing our
    // pages), MIME sniffing, and referrer leakage.
    return [
      {
        source: "/:path*",
        headers: [
          // Stops other sites from embedding our pages in an iframe
          // (clickjacking). We frame Stripe, not the other way around, so
          // SAMEORIGIN is safe.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          // Stops the browser from guessing a different content type than we
          // send (defends against MIME-sniffing attacks).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Don't leak full URLs (which can contain case ids) to other sites.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // The canonical slug URL /small-claims/sue-<category>-<slug> serves
      // the file at /small-claims/<category>/<slug>/page.tsx via rewrite,
      // so users always see the slug URL even though the file lives
      // under the directory shape.
      { source: "/small-claims/sue-landlord-:issue", destination: "/small-claims/landlord/:issue" },
      { source: "/small-claims/sue-employer-:issue", destination: "/small-claims/employer/:issue" },
      { source: "/small-claims/sue-contractor-:issue", destination: "/small-claims/contractor/:issue" },
      { source: "/small-claims/sue-auto-:issue", destination: "/small-claims/auto/:issue" },
      { source: "/small-claims/sue-neighbor-:issue", destination: "/small-claims/neighbor/:issue" },
      { source: "/small-claims/sue-loan-:issue", destination: "/small-claims/personal-loan/:issue" },
      { source: "/small-claims/sue-roommate-:issue", destination: "/small-claims/roommate/:issue" },
      { source: "/small-claims/sue-seller-:issue", destination: "/small-claims/online-seller/:issue" },
      { source: "/small-claims/sue-refund-:issue", destination: "/small-claims/refund/:issue" },
    ];
  },
};

export default nextConfig;
