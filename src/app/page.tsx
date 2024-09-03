import { allBlogPosts } from "contentlayer/generated"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Fragment, Suspense } from "react"
import ErrorBoundary from "src/components/error-boundary"
import Icon from "src/components/icon"
import Squiggle from "src/components/squiggle"
import { siteData } from "src/lib/content"
import { formatDateFull } from "src/lib/format"

const LazyVisual = dynamic(() => import("src/components/heat-distortion"))

const roles = [
  {
    name: "Tailscale",
    href: "https://tailscale.com",
    period: "2019 – 2024",
  },
  { name: "Watsi", href: "https://watsi.org", period: "2016 – 2018" },
  { name: "Format", href: "https://format.org", period: "2013 – 2016" },
  { name: "Palantir", href: "https://palantir.com", period: "2015" },
  { name: "Facebook", href: "https://design.facebook.com", period: "2014" },
]

export default async function HomePage() {
  const buildDate = formatDateFull(new Date())

  return (
    <div className="page-home relative z-10 flex items-stretch overflow-x-hidden">
      <style
        dangerouslySetInnerHTML={{ __html: `html{background-color:#141414;}` }}
      />
      <div className="relative z-20 p-4 sm:p-16">
        <section className="max-w-[30rem]">
          <header className="mb-20 sm:mb-32">
            <Squiggle />
          </header>
          <div className="mb-12">
            <h1 className="mb-1">Ross Zurowski</h1>
            <ul className="flex space-x-2 text-xs opacity-75">
              {siteData.socialLinks.map((link) => (
                <li key={link.href}>
                  <ExternalLink href={link.href} title={link.title} />
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-12">
            <p>Designer and developer from Toronto.</p>
            <p>
              Currently taking a few months off to work on{" "}
              <ExternalLink title="Valise" href="https://valise.works" />.
              Previously working on peer-to-peer networking at{" "}
              <ExternalLink title="Tailscale" href="https://tailscale.com" />.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="mb-3 text-pink">CV</h2>
            <ul>
              {roles.map((role) => (
                <li className="relative flex" key={role.name}>
                  <span className="mr-4 inline-block w-36">{role.period}</span>
                  <a href={role.href} target="_blank" rel="noopener noreferrer">
                    <span className="inline-block w-32">{role.name}</span>
                    <span className="relative inline-block -rotate-45 select-none">
                      <Icon name="arrow-right" width={14} height={14} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <Section title="Recent projects">
            <ExternalLink title="Valise" href="https://valise.works" />,{" "}
            <ExternalLink title="html.green" href="https://html.green" />, plus
            sites for{" "}
            <ExternalLink title="Towards" href="https://towards.info" />,{" "}
            <ExternalLink title="Hannah" href="https://hannahlee.ca" />, and{" "}
            <ExternalLink title="Brian" href="https://sholis.com" />.
          </Section>
          <Section title="Recent writing">
            {allBlogPosts
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((post, i, arr) => (
                <Fragment key={post.slug}>
                  <Link href={post.url}>{post.title}</Link>
                  <span className="pl-2 opacity-50">{post.year}</span>
                  {i !== arr.length - 1 && <br />}
                </Fragment>
              ))}
          </Section>
          <Section title="Recent interests">
            Camping, 日本語, 한국어, SQLite, and smashed potatoes.
          </Section>
          <footer className="text-xs opacity-75">
            <p>
              Last updated {buildDate}. Past versions available{" "}
              <ExternalLink
                title="on GitHub"
                href="https://github.com/rosszurowski/rosszurowski.com/releases"
              />
              .
            </p>
          </footer>
        </section>
      </div>
      <Suspense>
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 h-full w-2/3 select-none">
          <ErrorBoundary fallback={null}>
            <LazyVisual />
          </ErrorBoundary>
        </div>
      </Suspense>
    </div>
  )
}

function Section(props: { title: string; children: React.ReactNode }) {
  const { title, children } = props
  return (
    <div className="mb-6">
      <h2 className="mb-3 text-pink">{title}</h2>
      <p>{children}</p>
    </div>
  )
}

function ExternalLink(props: { title: string; href: string }) {
  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      {props.title}
    </a>
  )
}
