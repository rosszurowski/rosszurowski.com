import Head from "next/head"
import { siteDatum } from "contentlayer/generated"
import { useRouter } from "next/router"

type Props = {
  title?: string
  description?: string
  type?: "article"
  url?: string
  imageUrl?: string
  updated?: string
}

const domain = "rosszurowski.com"

/**
 * Meta is a component that wraps standard page `meta` tags for SEO purposes.
 */
export default function Meta(props: Props) {
  const { title, description, type, imageUrl, updated } = props
  const router = useRouter()

  const formattedTitle = title
    ? siteDatum.title === title
      ? siteDatum.title
      : `${title} – ${siteDatum.title}`
    : siteDatum.title
  const formattedDescription = description || siteDatum.description
  const formattedType = type || "site"
  const formattedImageUrl = canonicalUrl(domain, imageUrl || "og-image.png")
  const formattedUrl = canonicalUrl(domain, router.asPath)

  return (
    <Head>
      <title key="title">{formattedTitle}</title>
      <meta name="author" key="author" content={siteDatum.title} />
      <meta name="description" key="desc" content={formattedDescription} />

      <meta property="og:title" key="ogt" content={formattedTitle} />
      <meta
        property="og:description"
        key="ogd"
        content={formattedDescription}
      />
      <meta property="og:site_name" key="ogsn" content={siteDatum.title} />
      <meta property="og:type" key="ogty" content={formattedType} />
      {imageUrl && <meta property="og:image" key="ogi" content={imageUrl} />}
      {updated && (
        <meta property="og:updated_time" key="ogut" content={updated} />
      )}

      <meta name="twitter:site" key="twts" content="@rosszurowski" />
      <meta name="twitter:creator" key="twtcrt" content="@rosszurowski" />
      <meta name="twitter:card" key="twtcrd" content="summary_large_image" />
      <meta
        name="twitter:image:src"
        key="twitter:image"
        content={formattedImageUrl}
      />

      <link rel="canonical" key="canonical" href={formattedUrl} />
      <link
        rel="shortcut icon"
        key="favicon"
        href="/favicon.svg"
        type="image/svg"
      />
    </Head>
  )
}

/**
 * canonicalUrl returns an absolute URL to a resource given a path and domain.
 * It trims any query parameters and removes the trailing slash.
 */
function canonicalUrl(domain: string, path: string) {
  const u = new URL(path, `https://${domain}`)
  u.hash = ""
  u.search = ""
  u.pathname = u.pathname
  return u.toString().replace(/\/$/, "")
}
