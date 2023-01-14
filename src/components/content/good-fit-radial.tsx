import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react"
import {
  curveBasisClosed,
  easeSinInOut,
  lineRadial,
  randomUniform,
  scaleLinear,
  select,
} from "d3"

export default function GoodFitRadial({
  caption,
  width = 756,
  height = 540,
}: {
  caption?: ReactNode
  width?: number
  height?: number
}) {
  return (
    <figure>
      <RadialSimulation width={width} height={height} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

type DataItem = {
  index: number
  value: number
}

function RadialSimulation({
  width,
  height,
}: {
  width: number
  height: number
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const contextRef = useRef<SVGPathElement>(null)
  const formRef = useRef<SVGPathElement>(null)

  const margin = 48
  const smallerSize = Math.min(width, height)
  const innerRadius = smallerSize / 8 - margin
  const outerRadius = smallerSize / 2 - margin
  const viewBox = [-width / 2, -height / 2, width, height].join(",")

  const y = useMemo(
    () => scaleLinear().domain([0, 1]).range([innerRadius, outerRadius]),
    [innerRadius, outerRadius]
  )
  const d = useCallback(
    (data: DataItem[]) => line.radius((d) => y(d.value))(data),
    [y]
  )

  useEffect(() => {
    if (!svgRef.current || !contextRef.current || !formRef.current) {
      return
    }
    const ballContext = select(contextRef.current)
    const ballForm = select(formRef.current)

    const tickInterval = 3 * 1000
    const tick = () => {
      const contextPath = d(getContextData())
      const formPath = d(getFormData())
      ballContext
        .transition()
        .ease(easeSinInOut)
        .duration(tickInterval)
        .attr("d", contextPath)
      ballForm
        .transition()
        .ease(easeSinInOut)
        .duration(tickInterval)
        .attr("d", formPath)
    }

    let tickId = 0 // setInterval IDs are guaranteed to be non-zero.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        tickId = window.setInterval(() => tick(), tickInterval)
        tick()
      } else {
        clearInterval(tickId)
      }
    })
    observer.observe(svgRef.current)
    return () => {
      clearInterval(tickId)
      observer.disconnect()
    }
  }, [d])

  const contextPath = d(getContextData()) || undefined
  const formPath = d(getFormData()) || undefined

  return (
    <svg className="bg-stone-50 w-full" viewBox={viewBox} ref={svgRef}>
      <path fill="#e8e8e8" d={contextPath} ref={contextRef} />
      <path fill="black" d={formPath} ref={formRef} />
      <g transform={`translate(${-outerRadius - 60} -15)`}>
        {/* The word "form" */}
        <path
          d="M6.20801 3.73598L8.48001 2.83998L11.232 2.99998V0.599976H9.15201L6.08001 1.78398L4.03201 4.95198L3.07201 9.39998L0.320007 9.68798V10.328H3.04001V21.656L3.00801 21.816L2.01601 22.488L0.320007 22.68V23H8.73601V22.68L6.72001 22.488L5.44001 21.848V10.328H9.82401V9.04798H6.56001L5.44001 9.17598V7.76798L5.63201 5.33598L6.20801 3.73598Z"
          fill="black"
        />
        <path
          d="M21.4147 22.52L24.8067 18.872L25.8627 13.56L23.6867 9.17598L19.6547 6.67998L15.7187 7.54398L12.2947 11.128L11.4627 15.512L13.2547 20.664L17.5107 23.32L21.4147 22.52ZM15.2387 20.664L13.6067 16.792L14.3747 11.512L16.1347 8.31198L18.6627 7.44798L21.8627 9.30398L23.4947 13.848L22.7267 19.128L21.0947 21.656L18.4067 22.552L15.2387 20.664Z"
          fill="black"
        />
        <path
          d="M34.3201 6.99998L32.9121 8.18398L31.4721 11.576L31.6321 10.168V6.99998H30.2561L26.5441 7.83198V8.15198L28.2401 8.43998L29.2321 9.11198V21.816L28.2401 22.488L26.5441 22.68V23H34.3201V22.68L32.6241 22.488L31.6321 21.816V12.44L33.3921 9.23998L35.4081 8.08798L37.7761 8.47198L38.2241 6.93598L36.8481 6.67998L34.3201 6.99998Z"
          fill="black"
        />
        <path
          d="M64.14 21.816V9.94398L62.092 7.28798L59.244 6.67998L57.036 7.22398L55.564 8.18398L53.996 9.91198L51.98 7.28798L49.132 6.67998L46.924 7.22398L45.452 8.18398L43.756 11.576L43.916 10.168V6.99998H42.54L38.828 7.83198V8.15198L40.524 8.43998L41.516 9.11198V21.816L40.524 22.488L38.828 22.68V23H46.604V22.68L44.908 22.488L43.916 21.816V12.44L45.932 9.23998L48.012 8.11998L50.06 8.47198L51.628 10.488V21.816L50.636 22.488L48.94 22.68V23H56.716V22.68L55.02 22.488L54.028 21.816V12.12L54.764 10.264L56.044 9.23998L58.124 8.11998L60.172 8.47198L61.74 10.488V21.816L60.748 22.488L59.052 22.68V23H66.828V22.68L65.132 22.488L64.14 21.816Z"
          fill="black"
        />
      </g>
      <g opacity="0.75" transform={`translate(${outerRadius - 15} -15)`}>
        {/* The word "context" */}
        <path
          d="M13.44 8.33599L9.15202 5.67999L5.21602 6.54399L1.79202 10.128L0.960022 14.512L2.75202 19.984L7.32802 22.32L11.232 21.52L14.464 17.52L13.28 16.848L11.296 20.432L8.22402 21.552L4.73602 19.984L3.10402 15.792L3.87202 10.512L5.63202 7.31199L8.16002 6.44799L11.36 8.30399L12.096 12.144L14.464 11.664L13.44 8.33599Z"
          fill="black"
        />
        <path
          d="M26.9772 21.52L30.3692 17.872L31.4252 12.56L29.2492 8.17599L25.2172 5.67999L21.2812 6.54399L17.8572 10.128L17.0252 14.512L18.8172 19.664L23.0732 22.32L26.9772 21.52ZM20.8012 19.664L19.1692 15.792L19.9372 10.512L21.6972 7.31199L24.2252 6.44799L27.4252 8.30399L29.0572 12.848L28.2892 18.128L26.6572 20.656L23.9692 21.552L20.8012 19.664Z"
          fill="black"
        />
        <path
          d="M47.3066 20.816V8.94399L45.2586 6.28799L42.4106 5.67999L40.2026 6.22399L38.7306 7.18399L37.0346 10.576L37.1946 9.16799V5.99999H35.8186L32.1066 6.83199V7.15199L33.8026 7.43999L34.7946 8.11199V20.816L33.8026 21.488L32.1066 21.68V22H39.8826V21.68L38.1866 21.488L37.1946 20.816V11.44L39.2106 8.23999L41.2906 7.11999L43.3386 7.47199L44.9066 9.48799V20.816L43.9146 21.488L42.2186 21.68V22H49.9946V21.68L48.2986 21.488L47.3066 20.816Z"
          fill="black"
        />
        <path
          d="M55.1042 7.27999H59.4882V5.99999H56.2242L54.5922 6.22399L55.1042 4.78399V0.23999H54.4642L53.5682 2.09599L52.7042 6.35199L49.9842 6.63999V7.27999H52.7042V18.96L54.8482 22.32L58.2722 21.712L59.6162 19.088L59.0402 18.768L57.6642 20.848L56.1602 20.624L55.1042 18.256V7.27999Z"
          fill="black"
        />
        <path
          d="M74.3809 17.52L73.1969 16.848L71.2129 20.432L68.1409 21.552L64.6529 19.984L63.0209 15.792L63.2449 14.192L68.3009 14.48L74.6049 13.52L74.1249 10.16L72.5249 7.59999L69.0689 5.67999L65.1329 6.54399L61.7089 10.128L60.8769 14.512L62.6689 19.984L67.2449 22.32L71.1489 21.52L74.3809 17.52ZM63.7889 10.512L65.5489 7.31199L68.0769 6.44799L70.4449 7.56799L71.8529 10.192L72.0129 13.232L67.6609 13.808L63.3409 13.552L63.7889 10.512Z"
          fill="black"
        />
        <path
          d="M87.3988 17.968L84.5188 13.328L88.2948 8.52799L89.7348 6.86399L91.7508 6.31999L91.8148 5.99999H85.7988L85.7348 6.31999L86.8228 6.63999L87.3988 7.59999L87.4948 8.39999L84.1348 12.688L83.5268 11.728L80.0068 6.63999L79.1748 5.99999H75.3348L75.3988 6.31999L77.3188 7.24799L79.7188 10.032L82.5668 14.64L78.7908 19.472L77.3508 21.136L75.3348 21.68L75.2708 22H81.2868L81.3508 21.68L80.2628 21.36L79.6868 20.4L79.5908 19.6L82.9828 15.28L83.5268 16.176L87.1108 21.36L87.9428 22H91.7828L91.7188 21.68L89.7988 20.752L87.3988 17.968Z"
          fill="black"
        />
        <path
          d="M98.831 7.27999H103.215V5.99999H99.951L98.319 6.22399L98.831 4.78399V0.23999H98.191L97.295 2.09599L96.431 6.35199L93.711 6.63999V7.27999H96.431V18.96L98.575 22.32L101.999 21.712L103.343 19.088L102.767 18.768L101.391 20.848L99.887 20.624L98.831 18.256V7.27999Z"
          fill="black"
        />
      </g>
    </svg>
  )
}

const x = scaleLinear()
  .domain([0, 1])
  .range([0, 2 * Math.PI])
const line = lineRadial<DataItem>()
  .curve(curveBasisClosed)
  .angle((d) => x(d.index))

const points = 6
const getContextData = () => generateData(points, 0.74, 1.0)
const getFormData = () => generateData(points, 0.5, 0.76)

function generateData(points: number, min: number, max: number) {
  const r = randomUniform(min, max)
  return Array.from({ length: points }).map((_, i) => ({
    index: i / points,
    value: r(),
  }))
}
