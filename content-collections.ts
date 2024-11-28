import { defineCollection, defineConfig } from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"
import { MDXContent } from "@content-collections/mdx/react"
import excerpt from "excerpt-html"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeExternalLinks from "rehype-external-links"
import rehypePrettyCode, {
  Options as PrettyCodeOptions,
} from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkSmartypants from "remark-smartypants"
import { createCssVariablesTheme } from "shiki/core"

const blogPosts = defineCollection({
  name: "blogPosts",
  directory: "content/",
  include: "log/**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    slug: z.string(),
    summary: z.string().optional(),
    date: z.string().date(),
    tags: z.string().array().optional(),
  }),
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc, {
      remarkPlugins: [remarkGfm, remarkSmartypants],
      rehypePlugins: [
        [rehypeSlug],
        [rehypePrettyCode, prettyCodeOptions],
        [
          rehypeExternalLinks,
          { rel: ["nofollow", "noreferrer"], target: "_blank" },
        ],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: "anchor",
              ariaHidden: true,
            },
            content() {
              return []
            },
          },
        ],
      ],
    })
    const html = await mdxToHtml(mdx)
    const year = formatYear(doc.date)
    return {
      ...doc,
      excerpt: doc.summary
        ? excerpt(doc.summary, {
            pruneLength: 200,
          })
        : doc.summary,
      html,
      year,
      url: `/log/${year}/${doc.slug}`,
      mdx,
    }
  },
})

export default defineConfig({
  collections: [blogPosts],
})

function formatYear(date: string) {
  return Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
    new Date(date)
  )
}

const theme = createCssVariablesTheme({
  name: "css-variables",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
})

const prettyCodeOptions: Partial<PrettyCodeOptions> = {
  // @ts-expect-error
  theme,
  keepBackground: false,
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className?.push("highlighted-line")
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ["highlighted-word"]
  },
}

/**
 * mdxToHtml converts MDX code to HTML by server-rendering the React code. It
 * must provide replacements for any custom components used in the Markdown
 * component.
 */
async function mdxToHtml(mdxSource: string) {
  const element = createElement(
    MDXContent,
    {
      code: mdxSource,
      components: {
        Image: (props) =>
          createElement("figure", {}, [
            createElement("img", {
              src: props.src,
              alt: props.alt,
              width: props.width,
              height: props.height,
            }),
            props.caption &&
              createElement(
                "figcaption",
                {},
                createElement("p", {}, props.caption)
              ),
          ]),
        Note: (props) =>
          createElement("div", { className: "note" }, props.children),
      },
    },
    null
  )
  return renderToStaticMarkup(element)
}
