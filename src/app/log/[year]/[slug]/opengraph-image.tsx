import { allBlogPosts } from "content-collections"
import { BlogPageProps, getData } from "src/app/log/[year]/[slug]/data"
import { generateImage } from "src/components/og-image/og-image"

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    year: post.year,
    slug: post.slug,
  }))
}

export default async function Image({ params }: BlogPageProps) {
  const data = await getData(await params)
  if (!data.post) {
    return generateImage({})
  }
  const title = data.post.title
  return generateImage({ title })
}
