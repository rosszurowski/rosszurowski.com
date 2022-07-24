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
  const { post, otherPosts } = props

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
          {otherPosts.map((p) => (
            <div key={p._id}>
              <Link href={p.url}>
                <a>{p.title}</a>
              </Link>
            </div>
          ))}
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
  const [year, slug] = Array.isArray(slugParam) ? slugParam : ["", slugParam]
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
        permanent: false,
      },
    }
  }

  const otherPosts: PostPreview[] = allBlogPosts
    .filter((p) => p._id !== post._id)
    .slice(0, 5)
    .map((p) => ({
      _id: p._id,
      title: p.title,
      date: p.date,
      formattedDate: p.formattedDate,
      url: p.url,
    }))

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

  const paths = allBlogPosts.map((post) => ({
    params: { slug: [post.year, post.slug] },
  }))

  return {
    paths,
    fallback: false,
  }
}
