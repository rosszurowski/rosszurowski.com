import { notFound } from "next/navigation"

/**
 * This page is a workaround for the fact that the new appDir feature doesn't
 * support a catch-all 404 page. It sounds like this feature will be added in
 * a later release. In the meantime, we catch any slugs which don't exist with
 * a [...slug] route and render a 404.
 *
 * See: https://github.com/vercel/next.js/issues/42560
 */
export default function NotFoundWorkaround() {
  return notFound()
}
