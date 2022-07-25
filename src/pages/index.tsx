import { homeDatum, siteDatum } from "contentlayer/generated"
import type { GetStaticProps } from "next"
import Link from "next/link"
import { format } from "date-fns"
import { ReactNode } from "react"
import HomeLayout from "src/components/home-layout"
import Icon from "src/components/icon"
import generateRSSFeeds from "src/lib/rss"
import copyStaticAssets from "src/lib/assets"

type Props = {
  buildDate: string
}

export default function HomePage(props: Props) {
  const { buildDate } = props

  return (
    <HomeLayout className="page-home">
      <div className="mb-12">
        <h1 className="mb-1">Ross Zurowski</h1>
        <ul className="flex space-x-2 text-xs opacity-75">
          {siteDatum.socialLinks.map((link) => (
            <li key={link.href}>
              <ExternalLink href={link.href} title={link.title} />
            </li>
          ))}
        </ul>
      </div>
      <div
        className="mb-12"
        dangerouslySetInnerHTML={{ __html: homeDatum.intro.html }}
      />
      <div className="mb-6">
        <h4 className="mb-3 text-pink">CV</h4>
        <ul>
          {homeDatum.roles.map((role) => (
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
        Sites for{" "}
        <ExternalLink title="Hannah Lee" href="https://hannahlee.ca" /> &{" "}
        <ExternalLink title="Brian  Sholis" href="https://sholis.com" />,
        collecting{" "}
        <ExternalLink title="broken idioms" href="https://broken-idioms.com/" />
        .
      </Section>
      <Section title="Recent interests">
        <Link href="/log/2018/small-seasons-long-calendars">
          <a>Alternate calendars</a>
        </Link>
        , “the feed”, 日本語,{" "}
        <ExternalLink
          title="language and thought"
          href="https://www.are.na/ross-zurowski/language-thought"
        />
        ,{" "}
        <Link href="/log/2017/toward-a-distributed-web/">
          <a>decentralized publishing</a>
        </Link>
        , and making ice cream.
      </Section>
      <footer className="text-xs opacity-75">
        <p>
          Last updated {buildDate}. Past versions of this site are available{" "}
          <ExternalLink
            title="on GitHub"
            href="https://github.com/rosszurowski/rosszurowski.com/releases"
          />
          .
        </p>
      </footer>
    </HomeLayout>
  )
}

function Section(props: { title: string; children: ReactNode }) {
  const { title, children } = props
  return (
    <div className="mb-6">
      <h4 className="mb-3 text-pink">{title}</h4>
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

export const getStaticProps: GetStaticProps = async () => {
  await generateRSSFeeds()
  await copyStaticAssets()

  return {
    props: {
      buildDate: format(new Date(), "MMM d, yyyy"),
    },
  }
}
