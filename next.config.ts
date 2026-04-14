import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "clawauthor.com",
          },
        ],
        destination: "https://www.clawauthor.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
