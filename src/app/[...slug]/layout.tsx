import StandardLayout from "src/components/standard-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StandardLayout hideHeader>{children}</StandardLayout>
}
