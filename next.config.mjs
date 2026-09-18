/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,

  images: {
    unoptimized: true,

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