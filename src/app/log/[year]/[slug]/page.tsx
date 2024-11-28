import { allBlogPosts } from "content-collections"
import { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { BlogPageProps, getData } from "src/app/log/[year]/[slug]/data"
import Icon from "src/components/icon"
import Markdown from "src/components/markdown"
import StandardLayout from "src/components/standard-layout"
import copyStaticAssets from "src/lib/assets"
import { siteData } from "src/lib/content"
import { formatDateFull } from "src/lib/format"

export const dynamic = "force-static"

export default async function BlogPage({ params }: BlogPageProps) {
  const { post, year } = await getData(await params)
  if (!post) {
    return notFound()
  }
  if (year !== post.year) {
    return redirect(post.url)
  }
  await copyStaticAssets(post)

  return (
    <StandardLayout>
      <article className="lg:flex">
        <header className="mb-10 mr-0 flex max-w-[13rem] flex-1 flex-col justify-between lg:mb-0 lg:mr-24">
          <div>
            <h1 className="text-balance mb-1 leading-normal text-purple">
              {post.title}
            </h1>
            <time className="opacity-50" dateTime={post.date}>
              {formatDateFull(post.date)}
            </time>
          </div>
          <div className="hidden lg:block">
            <BackHome />
          </div>
        </header>
        <div className="markdown max-w-xl xl:max-w-2xl">
          <Markdown code={post.mdx} />
        </div>
        <footer className="-ml-4 max-w-xl py-12 text-center lg:hidden">
          <BackHome />
        </footer>
      </article>
    </StandardLayout>
  )
}

function BackHome() {
  return (
    <Link href="/" className="opacity-50 hover:opacity-75">
      <span className="mr-2 inline-block">
        <Icon
          name="arrow-right"
          width={12}
          height={12}
          className="-scale-x-100"
        />
      </span>
      Back home
    </Link>
  )
}

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    year: post.year,
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { post } = await getData(await params)
  if (!post) {
    return {}
  }

  const title = post.title
  const description = post.excerpt
  const canonical = post.url

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: siteData.title,
      type: "article",
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    },
    alternates: {
      canonical,
    },
  }
}
