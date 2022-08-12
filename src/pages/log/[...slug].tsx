import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { allBlogPosts, BlogPost } from "contentlayer/generated"
import StandardLayout from "src/components/standard-layout"
import Icon from "src/components/icon"
import Meta from "src/components/meta"
import { widont } from "src/lib/html"

type PostPreview = Pick<
  BlogPost,
  "_id" | "title" | "date" | "formattedDate" | "url"
>

type Props = {
  post: BlogPost
  otherPosts: PostPreview[]
}

export default function LogPage(props: Props) {
  const { post } = props

  return (
    <StandardLayout>
      <Meta title={post.title} description={post.excerpt} type="article" />
      <article className="lg:flex">
        <header className="mb-10 mr-0 flex max-w-[13rem] flex-1 flex-col justify-between lg:mb-0 lg:mr-24">
          <div>
            <h1
              className="mb-1 leading-normal text-purple"
              dangerouslySetInnerHTML={{
                __html: widont(post.title),
              }}
            />
            <time className="opacity-50" dateTime={post.date}>
              {post.formattedDate}
            </time>
          </div>
          <div className="hidden lg:block">
            <BackHome />
          </div>
        </header>
        <div
          className="markdown max-w-xl xl:max-w-2xl"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
        <footer className="-ml-4 max-w-xl py-12 text-center lg:hidden">
          <BackHome />
        </footer>
      </article>
    </StandardLayout>
  )
}

function BackHome() {
  return (
    <Link href="/">
      <a className="opacity-50 hover:opacity-75">
        <span className="mr-2 inline-block">
          <Icon
            name="arrow-right"
            width={12}
            height={12}
            className="-scale-x-100"
          />
        </span>
        Back home
      </a>
    </Link>
  )
}

export const getStaticProps: GetStaticProps = (ctx) => {
  const slugParam = ctx.params?.["slug"]
  const [year, maybeSlug] = Array.isArray(slugParam)
    ? slugParam
    : ["", slugParam]
  const slug = maybeSlug || year
  const post = allBlogPosts.find((post) => post.slug === slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  if (year !== post.year) {
    return {
      redirect: {
        destination: post.url,
        permanent: true,
      },
    }
  }

  const otherPosts: PostPreview[] = []

  return {
    props: {
      post,
      otherPosts,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  // Don't prerender static pages in preview environments
  // for faster builds (but slower initial page load).
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    }
  }

  const paths: { params: Record<string, any> }[] = []

  allBlogPosts.forEach((post) => {
    // Add blog /log/:slug and /log/:year/:slug
    paths.push({ params: { slug: [post.year, post.slug] } })
    paths.push({ params: { slug: [post.slug] } })
  })

  return {
    paths,
    fallback: false,
  }
}
