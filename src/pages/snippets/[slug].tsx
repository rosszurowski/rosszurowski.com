import { allSnippets, Snippet } from "contentlayer/generated"
import { GetStaticPaths, GetStaticProps } from "next"
import StandardLayout from "src/components/standard-layout"

type Props = {
  snippet: Snippet
}

export default function SnippetPage(props: Props) {
  return (
    <StandardLayout>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">{props.snippet.title}</h1>
      </header>
      <article>
        <div
          className="markdown max-w-2xl"
          dangerouslySetInnerHTML={{ __html: props.snippet.body.html }}
        />
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
