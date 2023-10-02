import { defineDocumentType, makeSource } from "contentlayer/source-files"
import excerpt from "excerpt-html"
import { bundleMDX } from "mdx-bundler"
import { getMDXComponent } from "next-contentlayer/hooks"
import { createElement, ReactElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import externalLinks from "rehype-external-links"
import rehypePrettyCode, {
  Options as PrettyCodeOptions,
} from "rehype-pretty-code"
import rehypeSlugHeadings from "rehype-slug"
import gfm from "remark-gfm"
import smartypants from "remark-smartypants"

function formatYear(date: string) {
  return Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
    new Date(date)
  )
}

/**
 * mdxToHtml converts MDX code to HTML by server-rendering the React code. It
 * must provide replacements for any custom components used in the Markdown
 * component.
 */
async function mdxToHtml(mdxSource: string) {
  const { code } = await bundleMDX({ source: mdxSource })
  const MDXLayout = getMDXComponent(code)
  const element = MDXLayout({
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
  })!
  return renderToStaticMarkup(element as ReactElement)
}

export const BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: "log/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    summary: {
      type: "string",
      description: "Summary of the post for SEO.",
    },
    slug: {
      type: "string",
      description: "The URL segment of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date the post was published",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/log/${formatYear(post.date)}/${post.slug}`,
    },
    year: {
      type: "string",
      resolve: (post) => formatYear(post.date),
    },
    html: {
      type: "string",
      resolve: (doc) => mdxToHtml(doc.body.raw),
    },
    excerpt: {
      type: "string",
      resolve: (post) =>
        post.summary
          ? excerpt(post.summary, {
              pruneLength: 200,
            })
          : post.summary,
    },
  },
}))

const prettyCodeOptions: Partial<PrettyCodeOptions> = {
  theme: "css-variables",
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted-line")
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["highlighted-word"]
  },
}

export default makeSource({
  contentDirPath: "content",
  documentTypes: [BlogPost],
  mdx: {
    remarkPlugins: [gfm, smartypants],
    rehypePlugins: [
      [rehypePrettyCode, prettyCodeOptions],
      [externalLinks, { rel: ["nofollow", "noreferrer"], target: "_blank" }],
      rehypeSlugHeadings,
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
  },
  date: {
    timezone: "America/New_York",
  },
})
