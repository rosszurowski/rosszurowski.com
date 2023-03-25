import Link from "next/link"
import Icon from "src/components/icon"
import PlausibleEvent from "src/components/plausible-event"
import RedirectAfter from "src/components/redirect-after"
import StandardLayout from "src/components/standard-layout"

export default function NotFoundPage() {
  return (
    <StandardLayout hideHeader>
      <PlausibleEvent eventName="404" />
      <RedirectAfter seconds={4} to="/" />
      <Icon name="dead-folder" className="mb-4" width={32} height={32} />
      <p>
        Page not found. Redirecting you{" "}
        <Link href="/" className="link-underline">
          back home
        </Link>
        &hellip;
      </p>
    </StandardLayout>
  )
}
