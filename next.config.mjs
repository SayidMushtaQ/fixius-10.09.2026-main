/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "oficios24.de",
      },
      {
        protocol: "https",
        hostname: "t3.ftcdn.net",
      },
    ],
  },
  // Canonical host: send the apex domain to the www subdomain (SEO canonical).
  // Requires the reverse proxy to forward the original `Host` header.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "fixius.de" }],
        destination: "https://www.fixius.de/:path*",
        permanent: true,
      },
    ];
  },
  // Proxy/Rewrites — replaces middleware for URL rewriting
  async rewrites() {
    return [
      {
        source: "/handwerker-in-meiner-naehe/:slug",
        destination: "/:slug-in-der-naehe",
      },
    ];
  },
};

export default nextConfig;
