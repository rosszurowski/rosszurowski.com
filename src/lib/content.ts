export const siteData = {
  title: "Ross Zurowski",
  description: "Designer and developer from Toronto.",
  email: "ross@rosszurowski.com",
  url: "https://rosszurowski.com",
  socialLinks: [
    {
      title: "Email",
      href: "mailto:ross@rosszurowski.com",
    },
    {
      title: "GitHub",
      href: "https://github.com/rosszurowski",
    },
    {
      title: "Bluesky",
      href: "https://bsky.app/profile/rosszurowski.com",
    },
    {
      title: "Are.na",
      href: "https://www.are.na/ross-zurowski",
    },
  ],
}

export function generateSocialImageURL({ title }: { title: string }) {
  return `/api/og?title=${encodeURIComponent(title)}`
}

/**
 * canonicalUrl returns an absolute URL to a resource given a path and domain.
 * It trims any query parameters and removes the trailing slash.
 */
export function canonicalUrl(domain: string, path: string) {
  const u = new URL(path, domain)
  u.protocol = "https"
  u.hash = ""
  u.pathname = u.pathname
  return u.toString().replace(/\/$/, "")
}
