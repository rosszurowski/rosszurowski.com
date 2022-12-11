import PlausibleProvider from "next-plausible"
import "../styles/index.css"

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
