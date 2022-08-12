import StandardLayout from "src/components/standard-layout"
import { allSnippets, Snippet } from "contentlayer/generated"
import { GetStaticProps } from "next"
import Link from "next/link"

type SnippetPreview = Pick<Snippet, "_id" | "title" | "url">

type Props = {
  snippets: SnippetPreview[]
}

export default function SnippetIndexPage(props: Props) {
  const { snippets } = props

  return (
    <StandardLayout>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Snippets</h1>
        <p>Notes on development.</p>
      </header>
      {snippets.map((snippet) => (
        <div className="relative" key={snippet._id}>
          <h2>
            <Link href={snippet.url}>
              <a className="stretched-link">{snippet.title}</a>
            </Link>
          </h2>
        </div>
      ))}
    </StandardLayout>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const snippets = allSnippets.map((snippet) => ({
    _id: snippet._id,
    title: snippet.title,
    url: snippet.url,
  }))

  return {
    props: {
      snippets,
    },
  }
}
