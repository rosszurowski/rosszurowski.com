import { ComponentPropsWithoutRef, Suspense } from "react"
import { useMDXComponent } from "next-contentlayer/hooks"
import Img from "next/future/image"

type Props = {
  code: string
}

const components = {
  Image,
}

/**
 * Markdown renders MDX content into components.
 */
export default function Markdown(props: Props) {
  const MDXContent = useMDXComponent(props.code)

  return (
    <Suspense>
      <MDXContent components={components} />
    </Suspense>
  )
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
  const { children, caption: rawCaption, ...rest } = props
  const caption = rawCaption || children

  return (
    <figure>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Img {...rest} sizes="(min-width: 48em) 50vw, 100vw" quality={80} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
