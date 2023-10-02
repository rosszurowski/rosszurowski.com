/* eslint-disable @typescript-eslint/no-var-requires */
const { withContentlayer } = require("next-contentlayer")
const { withPlausibleProxy } = require("next-plausible")

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
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

module.exports = withPlausibleProxy({
  scriptName: "metrics",
})(withContentlayer(config))
