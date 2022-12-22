"use client"

import cx from "clsx"
import { useEffect, useRef, useState } from "react"
import HeatDistortionProgram from "./program"

const svg = `
  <g fill="#f79e98">
    <rect x="25%" y="157" width="45%" height="120" transform="rotate(-20)" />
    <circle cx="50%" cy="400" r="140" />
    <rect x="150" y="460" width="65%" height="80" transform="rotate(25 20 700)" />
    <circle cx="42%" cy="960" r="92" />
  </g>
`

export default function HomeVisual() {
  const ref = useRef<HTMLCanvasElement>(null)
  const program = useRef<HeatDistortionProgram | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    if (!program.current) {
      program.current = new HeatDistortionProgram(ref.current, svg)
    }
    const p = program.current
    if (!p) {
      return
    }
    const mq = window.matchMedia("(min-width: 700px)")
    let timeoutId: number | null = null

    function toggleProgram(active: boolean) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      if (active) {
        p.start()
        timeoutId = window.setTimeout(() => setShow(true), 200)
        return
      }
      timeoutId = window.setTimeout(() => p.stop(), 500)
      setShow(false)
    }

    mq.addEventListener("change", (e: MediaQueryListEvent) => {
      toggleProgram(e.matches)
    })

    p.setup().then(() => {
      toggleProgram(mq.matches)
    })

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      p.destroy()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className={cx("transition-opacity duration-500", {
        "opacity-0": !show,
      })}
    />
  )
}
