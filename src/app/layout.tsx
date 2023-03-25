import { Metadata } from "next"
import PlausibleProvider from "next-plausible"
import { siteData } from "src/lib/content"
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
  return {
    metadataBase: new URL(siteData.url),
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
    },
    twitter: {
      card: "summary_large_image",
      site: "@rosszurowski",
    },
    alternates: {
      types: {
        "application/rss+xml": "/index.xml",
      },
    },
  }
}
