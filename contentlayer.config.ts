import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files"
import { parseISO, format } from "date-fns"
import excerpt from "excerpt-html"
import smartypants from "remark-smartypants"
import gfm from "remark-gfm"
import externalLinks from "rehype-external-links"
import autolinkHeadings from "rehype-autolink-headings"
import slugHeadings from "rehype-slug"
import highlight from "rehype-prism-plus"

const formatDate = (date: string, formatString: string): string =>
  format(parseISO(date), formatString)

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
      resolve: (post) => `/log/${formatDate(post.date, "yyyy")}/${post.slug}`,
    },
    year: {
      type: "string",
      resolve: (post) => formatDate(post.date, "yyyy"),
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
    formattedDate: {
      type: "string",
      resolve: (post) => formatDate(post.date, "MMM d, yyyy"),
    },
  },
}))

const Snippet = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: "snippets/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the snippet",
      required: true,
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
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/snippets/${doc.slug}`,
    },
  },
}))

const SocialLink = defineNestedType(() => ({
  name: "SocialLink",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    href: {
      type: "string",
      required: true,
    },
  },
}))

const SiteData = defineDocumentType(() => ({
  name: "SiteData",
  filePathPattern: "site.json",
  isSingleton: true,
  contentType: "data",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    url: {
      type: "string",
      required: true,
    },
    socialLinks: {
      type: "list",
      of: SocialLink,
      required: true,
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [BlogPost, Snippet, SiteData],
  mdx: {
    remarkPlugins: [gfm, smartypants],
    rehypePlugins: [
      highlight,
      [externalLinks, { rel: ["nofollow", "noreferrer"], target: "_blank" }],
      slugHeadings,
      [
        autolinkHeadings,
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
