import { allSnippets, Snippet } from "contentlayer/generated"
import { GetStaticPaths, GetStaticProps } from "next"
import { useLiveReload } from "next-contentlayer/hooks"
import Markdown from "src/components/markdown"
import StandardLayout from "src/components/standard-layout"

type Props = {
  snippet: Snippet
}

export default function SnippetPage(props: Props) {
  const { snippet } = props

  useLiveReload()

  return (
    <StandardLayout>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">{snippet.title}</h1>
      </header>
      <article className="markdown max-w-2xl">
        <Markdown code={snippet.body.code} />
      </article>
    </StandardLayout>
  )
}

export const getStaticProps: GetStaticProps = (ctx) => {
  const slug =
    (Array.isArray(ctx.params?.slug)
      ? ctx.params?.slug[0]
      : ctx.params?.slug) || ""
  const snippet = allSnippets.find((s) => s.slug === slug)

  return {
    props: { snippet },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allSnippets.map((snippet) => ({
    params: { slug: snippet.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}
