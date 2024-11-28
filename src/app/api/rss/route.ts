import { generateBlogFeed } from "src/lib/rss"

export const dynamic = "force-static"

export const GET = async () => {
  const feed = await generateBlogFeed()
  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  })
}
