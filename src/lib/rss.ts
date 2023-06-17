import { allBlogPosts } from "contentlayer/generated"
import { parseISO } from "date-fns"
import { Feed } from "feed"
import { mdxToHtml } from "src/lib/mdx"
import { siteData } from "./content"

/**
 * generateBlogFeed returns a feed object for generating an RSS feed
 * of blog posts.
 */
export function generateBlogFeed() {
  return generateFeed({
    description: "Recent blog posts by Ross Zurowski",
    items: allBlogPosts,
    titleField: (doc) => doc.title,
    dateField: (doc) => doc.date,
    urlField: (doc) => {
      const url = new URL(doc.url, siteData.url)
      return url.toString()
    },
    contentField: (doc) => mdxToHtml(doc.body.code),
  })
}

type FeedOptions<T> = {
  title?: string
  description: string
  url?: string
  items: T[]
  titleField: (doc: T) => string
  dateField: (doc: T) => string
  urlField: (doc: T) => string
  contentField: (doc: T) => string
  filterFn?: (doc: T) => boolean
}

function generateFeed<T>(options: FeedOptions<T>) {
  const { dateField, urlField, titleField, contentField } = options
  const year = new Date().getFullYear()

  const toTime = (doc: T) => parseISO(dateField(doc)).getTime()
  const items = options.items.slice().sort((a, b) => toTime(b) - toTime(a))

  const feed = new Feed({
    id: options.url || siteData.url,
    link: options.url || siteData.url,
    title: options.title || siteData.title,
    description: options.description,
    generator: "rosszurowski/v1",
    copyright: `© ${year} Ross Zurowski`,
    updated: new Date(),
  })

  items.forEach((doc) => {
    const url = urlField(doc)
    const date = parseISO(dateField(doc))
    const title = titleField(doc)
    const content = contentField(doc)

    feed.addItem({
      id: url,
      link: url,
      date,
      title,
      content,
    })
  })

  return feed
}
