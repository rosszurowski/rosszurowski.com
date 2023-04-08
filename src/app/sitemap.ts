import { allBlogPosts } from "contentlayer/generated"

/**
 * sitemap returns an array of objects that can be used to generate
 * a sitemap.xml file.
 */
export default function sitemap() {
  const lastBuild = formatDate(new Date().toISOString())

  const posts = allBlogPosts.map((post) => ({
    url: formatUrl(post.url),
    lastModified: formatDate(post.date),
  }))

  const routes = [""].map((route) => ({
    url: formatUrl(route),
    lastModified: lastBuild,
  }))

  return [...routes, ...posts]
}

const formatUrl = (path: string) => `https://rosszurowski.com${path}`
const formatDate = (date: string) => date.split("T")[0]
