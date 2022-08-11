import { ReactNode, Suspense } from "react"
import cx from "clsx"
import Squiggle from "src/components/squiggle"
import dynamic from "next/dynamic"

const LazyVisual = dynamic(() => import("src/components/heat-distortion"))

type Props = {
  className?: string
  children: ReactNode
}

export default function HomeLayout(props: Props) {
  const { className, children } = props

  return (
    <div
      className={cx(
        "page-home relative z-10 flex items-stretch overflow-x-hidden",
        className
      )}
    >
      <style
        dangerouslySetInnerHTML={{ __html: `html{background-color:#141414;}` }}
      />
      <div className="relative z-20 p-4 sm:p-16">
        <section className="max-w-[30rem]">
          <header className="mb-20 sm:mb-32">
            <Squiggle />
          </header>
          {children}
        </section>
      </div>
      <Suspense>
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 h-full w-2/3 select-none">
          <LazyVisual />
        </div>
      </Suspense>
    </div>
  )
}
