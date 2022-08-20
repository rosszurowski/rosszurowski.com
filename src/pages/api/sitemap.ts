import { allBlogPosts } from "contentlayer/generated"
import { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
  res.status(200)
  res.setHeader("Content-Type", "text/xml")
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  )
  res.write(createSitemap())
  res.end()
}

export default handler

function createSitemap() {
  const slugs = [""]

  allBlogPosts.forEach((post) => {
    slugs.push(post.url)
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${slugs
          .map(
            (slug) => `
                <url>
                    <loc>${`https://rosszurowski.com${slug}`}</loc>
                </url>
            `
          )
          .join("")}
    </urlset>
`
}
