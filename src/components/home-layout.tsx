import { ReactNode } from "react"
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
    <div className={cx("relative z-10 flex items-stretch", className)}>
      <style
        dangerouslySetInnerHTML={{ __html: `html{background-color:#141414;}` }}
      />
      <div className="p-4 sm:p-16">
        <section className="max-w-[30rem]">
          <header className="mb-20 sm:mb-32">
            <Squiggle />
          </header>
          {children}
        </section>
      </div>
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-[30%] z-0 select-none">
        <div className="relative h-full">
          <LazyVisual />
        </div>
      </div>
    </div>
  )
}
