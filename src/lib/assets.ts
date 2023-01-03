import { globby } from "globby"
import fs from "fs/promises"
import path from "path"
import { BlogPost } from "contentlayer/generated"

const contentFolder = "content"
const assets = "*.{jpg,jpeg,png,gif,svg}"

/**
 * copyStaticAssets copies the static files for a single blog post over from
 * the `content` directory` to the `public` folder for serving. This is a
 * stop-gap until Contentlayer supports images. See:
 * https://github.com/contentlayerdev/contentlayer/issues/11
 */
export default async function copyStaticAssets(post: BlogPost) {
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

    // Fetch the stats for both the source and destination files. If the
    // destination file is newer than the source file, we can skip copying.
    const ostat = await fs.stat(file)
    const nstat = await fs.stat(outputPath).catch(() => null)
    if (nstat && ostat.mtime <= nstat.mtime) {
      continue
    }

    const dirname = path.dirname(outputPath)
    await fs.mkdir(dirname, { recursive: true })
    await fs.copyFile(file, outputPath)
    console.log("Copied", file, "to", outputPath)
  }
}
