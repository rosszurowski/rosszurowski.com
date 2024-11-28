import { allBlogPosts } from "content-collections"

export type BlogPageParams = { year: string; slug: string }

export type BlogPageProps = {
  params: Promise<BlogPageParams>
}

export async function getData(params: BlogPageParams) {
  const post = allBlogPosts.find((post) => post.slug === params.slug)
  return { post, year: params.year }
}
