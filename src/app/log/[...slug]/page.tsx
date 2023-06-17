import { allBlogPosts } from "contentlayer/generated"
import { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { Balancer } from "react-wrap-balancer"
import Icon from "src/components/icon"
import Markdown from "src/components/markdown"
import StandardLayout from "src/components/standard-layout"
import copyStaticAssets from "src/lib/assets"
import { generateSocialImageURL, siteData } from "src/lib/content"

type PageProps = {
  params: { slug: string[] }
}

export default async function BlogPage({ params }: PageProps) {
  const { post, year } = await getData(params.slug)
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
            <h1 className="mb-1 leading-normal text-purple">
              <Balancer>{post.title}</Balancer>
            </h1>
            <time className="opacity-50" dateTime={post.date}>
              {post.formattedDate}
            </time>
          </div>
          <div className="hidden lg:block">
            <BackHome />
          </div>
        </header>
        <div className="markdown max-w-xl xl:max-w-2xl">
          <Markdown code={post.body.code} />
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

async function getData(slugParam: string[]) {
  const [year, maybeSlug] = slugParam
  const slug = maybeSlug || year
  const post = allBlogPosts.find((post) => post.slug === slug)
  return { post, year }
}

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: [post.year, post.slug],
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { post } = await getData(params.slug)
  if (!post) {
    return {}
  }

  const title = post.title
  const description = post.excerpt
  const canonical = post.url
  const images = generateSocialImageURL({ title: post.title })

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: siteData.title,
      type: "article",
      images,
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images,
    },
    alternates: {
      canonical,
    },
  }
}
