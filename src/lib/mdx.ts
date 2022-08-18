import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import Markdown from "src/components/markdown"

/**
 * mdxToHtml converts MDX code to HTML by server-rendering the React code.
 */
export function mdxToHtml(code: string) {
  return renderToStaticMarkup(createElement(Markdown, { code }))
}

if (typeof window !== "undefined") {
  // Little helper so I never import it into the client bundles.
  console.warn(
    "mdxToHtml was imported into the client bundle. Remove any client-side references to mdxToHtml."
  )
}
