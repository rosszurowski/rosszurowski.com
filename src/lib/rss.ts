import fs from "fs/promises"
import { parseISO } from "date-fns"
import { Feed } from "feed"
import { allBlogPosts, siteDatum } from "contentlayer/generated"
import path from "path"

const outputPath = "public"

/**
 * generateRSSFeeds writes a collection of RSS feeds to the filesystem.
 */
export default async function generateRSSFeeds() {
  await generateFeed({
    url: siteDatum.url,
    title: siteDatum.title,
    description: "Recent blog posts by Ross Zurowski",
    items: allBlogPosts,
    path: path.join(outputPath, "log/index.xml"),
    titleField: (doc) => doc.title,
    dateField: (doc) => doc.date,
    urlField: (doc) => {
      const url = new URL(doc.url, siteDatum.url)
      return url.toString()
    },
    contentField: (doc) => doc.body.html,
  })
}

type FeedOptions<T> = {
  title: string
  description: string
  url: string
  items: T[]
  path: string
  titleField: (doc: T) => string
  dateField: (doc: T) => string
  urlField: (doc: T) => string
  contentField: (doc: T) => string
  filterFn?: (doc: T) => boolean
}

async function generateFeed<T>(options: FeedOptions<T>) {
  const { dateField, urlField, titleField, contentField } = options
  const year = new Date().getFullYear()

  const toTime = (doc: T) => parseISO(dateField(doc)).getTime()
  const items = options.items.slice().sort((a, b) => toTime(b) - toTime(a))

  const feed = new Feed({
    id: options.url,
    link: options.url,
    title: options.title,
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

  await fs.mkdir(path.dirname(options.path), { recursive: true })
  await fs.writeFile(options.path, feed.rss2())
}
