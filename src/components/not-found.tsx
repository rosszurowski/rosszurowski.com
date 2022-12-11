import Link from "next/link"
import Icon from "./icon"
import RedirectAfter from "./redirect-after"
import PlausibleEvent from "./plausible-event"

export default function NotFound() {
  return (
    <>
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
    </>
  )
}
