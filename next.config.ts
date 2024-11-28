import type { NextConfig } from "next"

import { withContentCollections } from "@content-collections/next"
import { withPlausibleProxy } from "next-plausible"

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/log", destination: "/", permanent: false },
      {
        source: "/100",
        destination: "https://100-2017.rosszurowski.com",
        permanent: false,
      },
      {
        source: "/2017/japan",
        destination: "https://japan-2017.rosszurowski.com",
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      { source: "/index.xml", destination: "/api/rss" },
      { source: "/log/index.xml", destination: "/api/rss" },
    ]
  },
}

export default withPlausibleProxy({
  scriptName: "metrics",
})(withContentCollections(config))
