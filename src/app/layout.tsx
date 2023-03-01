import { Metadata } from "next"
import PlausibleProvider from "next-plausible"
import { canonicalUrl, siteData } from "src/lib/content"
import "src/styles/index.css"

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <PlausibleProvider domain="rosszurowski.com" />
      <body>{children}</body>
    </html>
  )
}

export function generateMetadata(): Metadata {
  const images = canonicalUrl(siteData.url, "og-image.png")
  return {
    title: {
      default: siteData.title,
      template: `%s – ${siteData.title}`,
    },
    description: siteData.description,
    authors: [{ name: "Ross Zurowski" }],
    openGraph: {
      title: siteData.title,
      siteName: siteData.title,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      site: "@rosszurowski",
      images,
    },
    icons: "/favicon.svg",
    alternates: {
      types: {
        "application/rss+xml": "/index.xml",
      },
    },
  }
}
