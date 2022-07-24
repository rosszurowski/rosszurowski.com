import { ReactNode } from "react"
import Squiggle from "src/components/squiggle"

type Props = {
  hideHeader?: boolean
  children: ReactNode
}

export default function StandardLayout(props: Props) {
  const { children, hideHeader = false } = props

  return (
    <div className="p-4 sm:p-10 md:p-16">
      {hideHeader === false && (
        <header className="mb-20 sm:mb-32">
          <Squiggle />
        </header>
      )}
      {children}
    </div>
  )
}
