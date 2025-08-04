import type { NextConfig } from "next"

import { withContentCollections } from "@content-collections/next"
import { withPlausibleProxy } from "next-plausible"

const config: NextConfig = {
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
}


export default withPlausibleProxy({
  scriptName: "metrics",
})(withContentCollections(config))
