import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.boch-solutions.de" }],
        destination: "https://boch-solutions.de/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
