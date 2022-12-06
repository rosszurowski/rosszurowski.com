import NotFound from "src/components/not-found"
import StandardLayout from "src/components/standard-layout"

export default function NotFoundPage() {
  return (
    <StandardLayout hideHeader>
      <NotFound />
    </StandardLayout>
  )
}
