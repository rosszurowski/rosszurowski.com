"use client"

import { RefObject, useEffect, useState } from "react"

/**
 * useInView returns true if the element is in view.
 */
export function useInView(ref: RefObject<HTMLElement | SVGElement>) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    })
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [ref])

  return inView
}
