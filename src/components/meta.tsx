import { siteData } from "src/lib/content"

type Props = {
  title?: string
  description?: string
  type?: "article" | "site"
  imageUrl?: string
  updated?: string
  /**
   * url is the page's URL path, eg. "/log/2018/my-post". It's combined with
   * the site's domain to form a canonical URL to add in the meta tags.
   */
  url?: string
}

export default function MetaTags({
  title,
  description,
  type,
  imageUrl,
  updated,
  url,
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
  const formattedPageUrl = url ? canonicalUrl(siteData.url, url) : undefined

  return (
    <>
      <title>{formattedTitle}</title>
      <meta name="author" content={siteData.title} />
      <meta name="description" content={formattedDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={formattedDescription} />
      <meta property="og:site_name" content={siteData.title} />
      <meta property="og:type" content={formattedType} />
      {formattedImageUrl && (
        <meta property="og:image" content={formattedImageUrl} />
      )}
      {updated && <meta property="og:updated_time" content={updated} />}

      <meta name="twitter:site" content="@rosszurowski" />
      <meta name="twitter:creator" content="@rosszurowski" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:src" content={formattedImageUrl} />

      <link rel="alternate" type="application/rss+xml" href="/index.xml" />
      <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
      {formattedPageUrl && (
        <link rel="canonical" key="canonical" href={formattedPageUrl} />
      )}
    </>
  )
}

/**
 * canonicalUrl returns an absolute URL to a resource given a path and domain.
 * It trims any query parameters and removes the trailing slash.
 */
function canonicalUrl(domain: string, path: string) {
  const u = new URL(path, domain)
  u.protocol = "https"
  u.hash = ""
  u.pathname = u.pathname
  return u.toString().replace(/\/$/, "")
}
