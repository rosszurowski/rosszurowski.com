import { NextApiHandler } from "next"
import { generateBlogFeed } from "src/lib/rss"

const handler: NextApiHandler = async (req, res) => {
  const feed = generateBlogFeed()
  res.status(200)
  res.setHeader("Content-Type", "text/xml")
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  )
  res.write(feed.rss2())
  res.end()
}

export default handler
