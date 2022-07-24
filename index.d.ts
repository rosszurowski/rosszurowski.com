declare module "excerpt-html" {
  type Options = Partial<{
    moreRegExp: RegExp
    stripTags: boolean
    pruneLength: number
    pruneString: string
    pruneSeparator: string
  }>

  export default function excerpt(html: string, options: Options)
}
