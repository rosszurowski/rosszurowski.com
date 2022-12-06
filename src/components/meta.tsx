import { siteData } from "src/lib/content"

type Props = {
  title?: string
  description?: string
  type?: "article" | "site"
  imageUrl?: string
  updated?: string
}

export default function MetaTags({
  title,
  description,
  type,
  imageUrl,
  updated,
}: Props) {
  const formattedTitle = title
    ? siteData.title === title
      ? siteData.title
      : `${title} – ${siteData.title}`
    : siteData.title
  const formattedDescription = description || siteData.description
  const formattedType = type || "site"
  const formattedImageUrl = canonicalUrl(
    siteData.url,
    imageUrl || "og-image.png"
  )

  return (
    <>
      <title>{formattedTitle}</title>
      <meta name="author" content={siteData.title} />
      <meta name="description" content={formattedDescription} />

      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={formattedDescription} />
      <meta property="og:site_name" content={siteData.title} />
      <meta property="og:type" content={formattedType} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {updated && <meta property="og:updated_time" content={updated} />}

      <meta name="twitter:site" key="twts" content="@rosszurowski" />
      <meta name="twitter:creator" key="twtcrt" content="@rosszurowski" />
      <meta name="twitter:card" key="twtcrd" content="summary_large_image" />
      <meta
        name="twitter:image:src"
        key="twitter:image"
        content={formattedImageUrl}
      />

      <link rel="alternate" type="application/rss+xml" href="/index.xml" />
      <link
        rel="shortcut icon"
        key="favicon"
        href="/favicon.svg"
        type="image/svg"
      />
    </>
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
