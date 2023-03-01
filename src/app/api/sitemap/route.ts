import { allBlogPosts } from "contentlayer/generated"

export async function GET() {
  return new Response(createSitemap(), {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  })
}

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
