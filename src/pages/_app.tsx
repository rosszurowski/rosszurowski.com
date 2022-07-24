import "src/styles/index.css"
import type { AppProps } from "next/app"
import PlausibleProvider from "next-plausible"
import Meta from "src/components/meta"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="rosszurowski.com">
      <Meta />
      <Component {...pageProps} />
    </PlausibleProvider>
  )
}
