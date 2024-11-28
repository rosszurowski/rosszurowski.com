import { allBlogPosts } from "content-collections"
import { redirect } from "next/navigation"

export const dynamic = "force-static"

export default async function BlogRedirect(props: {
  params: Promise<{ year: string }>
}) {
  const params = await props.params
  const post = allBlogPosts.find((post) => post.slug === params.year)
  if (!post) {
    // No matching post? Redirect to the home page.
    return redirect(`/`)
  }
  return redirect(`/log/${post.year}/${post.slug}`)
}

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    year: post.slug,
  }))
}
