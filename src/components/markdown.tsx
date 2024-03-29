import cx from "clsx"
import { getMDXComponent } from "next-contentlayer/hooks"
import Img from "next/image"
import { ComponentPropsWithoutRef, ReactNode } from "react"

const components = {
  Image,
  Note,
}

/**
 * Markdown renders MDX content into components.
 */
export default function Markdown({ code }: { code: string }) {
  const MDXContent = getMDXComponent(code)
  return <MDXContent components={components} />
}

type ImageProps = {
  children?: string
  caption?: string
} & ComponentPropsWithoutRef<typeof Img>

/**
 * Image contains an image for a post. It applies standard styling, responsive
 * image approaches, and caption support.
 *
 * Set captions via the `caption` prop, or a child node. Child nodes
 * support markdown, whereas string props don't.
 *
 *     <Image caption="This is a caption" />
 *     <Image>This is a caption **with markdown**</Image>
 *
 */
function Image(props: ImageProps) {
  const { children, className, caption: rawCaption, ...rest } = props
  const caption = rawCaption || children

  return (
    <figure>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Img
        {...rest}
        className={cx("bg-stone-200", className)}
        sizes="(min-width: 48em) 50vw, 100vw"
        quality={80}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

function Note({ children }: { children?: ReactNode }) {
  return (
    <div className="note rounded-lg bg-stone-50 px-2 py-2 text-sm md:px-4 md:py-4">
      {children}
    </div>
  )
}
