import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // module.exports = {
  //   eslint: {
  //     // Warning: This allows production builds to successfully complete even if
  //     // your project has ESLint errors.
  //     ignoreDuringBuilds: true,
  //   },
  // },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
