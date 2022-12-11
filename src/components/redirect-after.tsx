"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RedirectAfter({
  seconds,
  to,
}: {
  seconds: number
  to: string
}) {
  const router = useRouter()

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      router.replace(to)
    }, seconds * 1000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [router, seconds, to])

  return null
}
