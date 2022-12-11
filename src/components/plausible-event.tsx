"use client"

import { usePlausible } from "next-plausible"
import { useEffect } from "react"

export default function PlausibleEvent({ eventName }: { eventName: string }) {
  const plausible = usePlausible()
  useEffect(() => {
    plausible(eventName, {
      props: {
        path: window.location.pathname,
        search: window.location.search,
      },
    })
  }, [plausible, eventName])
  return null
}
