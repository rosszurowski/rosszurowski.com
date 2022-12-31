import { allBlogPosts } from "contentlayer/generated"
import React from "react"
import MetaTags from "src/components/meta"

export default function Head({ params }: { params: { slug: string[] } }) {
  const [year, maybeSlug] = params.slug
  const slug = maybeSlug || year
  const post = allBlogPosts.find((post) => post.slug === slug)

  if (!post) {
    return null
  }

  return (
    <MetaTags
      title={post.title}
      description={post.excerpt}
      type="article"
      imageUrl={`/api/og?title=${encodeURIComponent(post.title)}`}
      url={`/log/${year}/${slug}`}
    />
  )
}
