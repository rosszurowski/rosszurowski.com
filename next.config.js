const { withContentlayer } = require("next-contentlayer")
const { withPlausibleProxy } = require("next-plausible")

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
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
}

module.exports = withPlausibleProxy({
  scriptName: "metrics.js",
  subdirectory: "assets",
})(withContentlayer(config))
