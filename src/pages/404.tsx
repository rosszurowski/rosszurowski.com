import { usePlausible } from "next-plausible"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Icon from "src/components/icon"
import StandardLayout from "src/components/standard-layout"

const timeoutSeconds = 4

export default function NotFoundPage() {
  const router = useRouter()
  const plausible = usePlausible()

  useEffect(() => {
    plausible("404", { props: { path: router.asPath } })
    const timeoutId = window.setTimeout(() => {
      router.push("/")
    }, timeoutSeconds * 1000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [plausible, router])

  return (
    <StandardLayout hideHeader>
      <Icon name="dead-folder" className="mb-4" width={32} height={32} />
      <p>
        Page not found. Redirecting you{" "}
        <Link href="/">
          <a className="link-underline">back home</a>
        </Link>
        &hellip;
      </p>
    </StandardLayout>
  )
}
