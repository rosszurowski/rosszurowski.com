import { allBlogPosts } from "content-collections"
import { MetadataRoute } from "next"
import { siteData } from "src/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = [{ url: siteData.url, lastModified: new Date() }]

  allBlogPosts.forEach((post) => {
    entries.push({
      url: new URL(post.url, siteData.url).toString(),
      lastModified: new Date(post.date),
    })
  })

  return entries
}
