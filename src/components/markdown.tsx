import { MDXContent } from "@content-collections/mdx/react"
import NextImage from "next/image"
import { ReactNode } from "react"

const components = {
  Image,
  Note,
}

/**
 * Markdown renders MDX content into components.
 */
export default function Markdown({ code }: { code: string }) {
  return <MDXContent code={code} components={components} />
}

type ImageProps = {
  className?: string
  children?: string
  caption?: string
  src: string
  alt: string
  width: number
  height: number
}

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
function Image({
  children,
  className,
  caption: rawCaption,
  width,
  height,
  src,
  alt,
  ...rest
}: ImageProps) {
  const caption = rawCaption || children

  return (
    <figure className={className}>
      <div
        className="bg-stone-200"
        style={{
          aspectRatio: `${width} / ${height}`,
        }}
      >
        <NextImage
          {...rest}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 48em) 50vw, 100vw"
          quality={80}
        />
      </div>
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
