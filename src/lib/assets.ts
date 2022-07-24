import { globby } from "globby"
import { allBlogPosts } from "contentlayer/generated"
import fs from "fs/promises"
import path from "path"

const contentFolder = "content"
const assets = "*.{jpg,jpeg,png,gif,svg}"

/**
 * copyStaticAssets copies static files over from the `content` folder to the
 * `public` folder for serving. This is intended as a stop-gap until
 * Contentlayer supports images.
 */
export default async function copyStaticAssets() {
  for (const post of allBlogPosts) {
    const glob = path.posix.join(contentFolder, post._raw.sourceFileDir, assets)
    const files = await globby(glob)
    for (const file of files) {
      const basename = path.basename(file)
      const outputPath = path.posix.join(
        "public",
        "log",
        post.year,
        post.slug,
        basename
      )
      const dirname = path.dirname(outputPath)
      await fs.mkdir(dirname, { recursive: true })
      await fs.copyFile(file, outputPath)
    }
  }
}
