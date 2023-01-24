import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  drag,
  select,
  forceSimulation,
  forceCollide,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
  Simulation,
  SimulationNodeDatum,
  ForceLink,
  Selection,
  ForceX,
  ForceY,
} from "d3"
import clsx from "clsx"
import { useInView } from "src/components/hooks"
import Icon from "src/components/icon"
import { constrain, randomItem } from "./utils"

/**
 * GoodFitVisualization is a visualization to accompany the "On Good Fit" blog
 * post.
 */
export default function GoodFitVisualization({
  variant = "basic",
  tickMs = 500,
  caption,
}: {
  variant: keyof typeof variants
  tickMs?: number
  caption?: string
}) {
  const { ref, tickRef, play, restart, state } = useForceSimulation(
    variant,
    tickMs
  )

  return (
    <figure>
      <div className="relative rounded-lg bg-stone-100">
        <button
          className={clsx(
            labelClass,
            labelRightClass,
            "flex items-center px-3 hover:bg-stone-600/5 hover:text-stone-700 active:scale-[98%]"
          )}
          onClick={state === "paused" ? play : restart}
        >
          <Icon
            className="inline-block opacity-75 mr-1.5"
            name={state === "paused" ? "play" : "cycle"}
            size="0.9em"
          />
          {state === "paused" ? "Play" : "Restart"}
        </button>
        <div className={clsx(labelClass, labelLeftClass, "px-2")}>
          <span>
            Iterations <span ref={tickRef}>0</span>
          </span>
        </div>
        <svg className="aspect-[7/5] w-full" ref={ref} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

const labelLeftClass = "bottom-2 left-2 md:left-3 md:bottom-3"
const labelRightClass = "bottom-2 right-2 md:right-3 md:bottom-3"
const labelClass =
  "absolute text-sm tracking-tight rounded py-1.5 text-stone-600 transition-color-opacity-transform"

type DataParams = {
  nodes: number
  groups?: number
  intragroupLinks?: number
  intergroupLinks?: number
}

type NodeData = {
  id: number
  x: number
  y: number
  active: boolean
}

type LinkData = {
  id: string
  distance: number
  strength: number
  source: number
  target: number
}

type LinkDataNode = Omit<LinkData, "source" | "target"> & {
  source: NodeData
  target: NodeData
}

type Data = {
  nodes: NodeData[]
  links: LinkData[]
  tickCount: number
}

const variants = {
  basic: {
    nodes: 12,
    intragroupLinks: 4,
  },
  "few-connections": {
    nodes: 30,
    intragroupLinks: 5,
  },
  "many-connections": {
    nodes: 30,
    intragroupLinks: 30,
  },
  groups: {
    nodes: 30,
    groups: 3,
    intragroupLinks: 10,
    intergroupLinks: 2,
  },
}

function useForceSimulation(variant: keyof typeof variants, tickMs: number) {
  const ref = useRef<SVGSVGElement>(null)
  const tickRef = useRef<HTMLSpanElement>(null)
  const simulation = useRef<ReturnType<typeof createSimulation> | null>(null)
  const [state, setState] = useState<"paused" | "playing" | "stopped">("paused")
  const [n, setN] = useState(0) // used to trigger a restart
  const [results, setResults] = useState<number[]>([])
  const inView = useInView(ref)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    simulation.current = createSimulation(ref.current)
    return () => {
      simulation.current?.destroy()
      simulation.current = null
    }
  }, [])

  useEffect(() => {
    simulation.current?.setData(generateData(variants[variant]))
  }, [variant, n])

  useEffect(() => {
    if (!inView) {
      return
    }
    const tick = () => {
      if (!simulation.current || state !== "playing") {
        return
      }
      const [tickCount, done] = simulation.current.tick()
      if (done) {
        setResults((p) => [...p, tickCount])
        return setState("stopped")
      }
      if (tickRef.current) {
        tickRef.current.textContent = `${tickCount.toString()}`
      }
    }
    const intervalId = window.setInterval(tick, tickMs)
    simulation.current?.play()
    return () => {
      simulation.current?.pause()
      window.clearInterval(intervalId)
    }
  }, [state, tickMs, inView])

  const play = useCallback(() => setState("playing"), [])
  const pause = useCallback(() => setState("paused"), [])
  const restart = useCallback(() => {
    // Generate a new number to force a re-creation of the simulation.
    setN((p) => p + 1)
    setState("playing")
  }, [])

  const avg = useMemo(() => {
    if (results.length === 0) {
      return 0
    }
    return Math.round(results.reduce((p, c) => p + c, 0) / results.length)
  }, [results])

  return { ref, tickRef, play, pause, restart, state, avg }
}

function createSimulation(el: SVGSVGElement) {
  let width = el.clientWidth
  let height = el.clientHeight
  const svg = select(el)

  // The maximum width of the visualization in the window. Used for resizing
  // the links between nodes as the browser shrinks.
  const maxWidth = 750
  let radius = 7
  let tickCount = 0

  const simulation = forceSimulation<NodeData, LinkData>()
    .force(
      "link",
      forceLink<NodeData, LinkData>()
        .id((d) => d.id)
        .strength((d) => d.strength)
        .iterations(5)
    )
    .force("collision", forceCollide().radius(radius + 2))
    .force("charge", forceManyBody().strength(-180))
    .force("x", forceX(width / 2).strength(0.1))
    .force("y", forceY(height / 2).strength(0.15))
    .on("tick", tick)
    .stop()

  const linkGroup = svg
    .append("g")
    .attr("stroke", "#b2b2b2")
    .attr("stroke-width", 1.5)
  const nodeGroup = svg
    .append("g")
    .attr("stroke", "rgba(245,245,244)")
    .attr("stroke-width", 2)

  let link: Selection<SVGLineElement, LinkData, SVGGElement, unknown> =
    linkGroup.selectAll("line")
  let node: Selection<SVGCircleElement, NodeData, SVGGElement, unknown> =
    nodeGroup.selectAll("circle")

  function resize() {
    width = el.clientWidth
    height = el.clientHeight
    const x = simulation.force("x") as ForceX<NodeData>
    const y = simulation.force("y") as ForceY<NodeData>
    const link = simulation.force("link") as ForceLink<NodeData, LinkData>
    simulation.stop()
    x.x(width / 2)
    y.y(height / 2)
    link.distance((d) => (width / maxWidth) * d.distance)
    radius = constrain(7 * (width / maxWidth), 5, 7)
    simulation.alpha(1.0).restart()
  }

  function update(data: Data, ticks = 1, alpha?: number) {
    if (!el) {
      return
    }
    const old = new Map(node.data().map((d) => [d.id, d]))
    data.nodes = data.nodes.map((d) => Object.assign(old.get(d.id) || {}, d))
    data.links = data.links.map((d) => Object.assign({}, d))

    node = node
      .data(data.nodes, (d) => d.id)
      .join("circle")
      .attr("fill", (d) => (d.active ? "black" : "#b2b2b2"))
      .call(addDrag(simulation))

    link = link.data(data.links).join("line")

    simulation.nodes(data.nodes)
    // @ts-expect-error
    simulation.force("link").links(data.links)
    if (alpha) {
      simulation.alpha(alpha)
    }
    simulation.restart()
    simulation.tick(ticks)
  }

  function lightTick() {
    const nodes = node.data()
    // Get the links with the embedded node data.
    // @ts-expect-error
    const links = link.data() as LinkDataNode[]

    let hasInactiveNode = false
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      if (node.active === false) {
        hasInactiveNode = true
      }
      let resolved = true // when all linked nodes are active
      for (let j = 0; j < links.length; j++) {
        const link = links[j]
        if (link.source.id !== node.id) {
          continue
        }
        const target = nodes[link.target.id]
        if (!target.active) {
          resolved = false
          break
        }
      }
      if (resolved) {
        if (node.active === false && Math.random() >= 0.5) {
          node.active = true
        }
      } else {
        if (Math.random() >= 0.5) {
          node.active = !node.active
        }
      }
      nodes[i] = node
    }
    if (hasInactiveNode) {
      tickCount++
      // Sets the links with the embedded node data.
      // @ts-expect-error
      update({ nodes, links }, 1, 0.05)
      return [tickCount, false] as const
    }
    // If we have no active nodes from the previous update, don't change
    // anything about the visualization.
    return [tickCount, true] as const
  }

  function setData(data: Data) {
    tickCount = 0
    update(data, 200, 1.0)
  }

  function tick() {
    // We need to ignore the typescript errors here because the types are
    // wrong. d3-force rewrites the source/target fields to not just be ID
    // references, but the actual node objects.
    link
      // @ts-expect-error
      .attr("x1", (d) => d.source.x)
      // @ts-expect-error
      .attr("y1", (d) => d.source.y)
      // @ts-expect-error
      .attr("x2", (d) => d.target.x)
      // @ts-expect-error
      .attr("y2", (d) => d.target.y)
    node.attr("r", radius).attr("cx", (d) => d.x).attr("cy", (d) => d.y)
  }

  function play() {
    simulation.restart()
  }

  function pause() {
    simulation.stop()
  }

  function destroy() {
    window.removeEventListener("resize", resize)
    simulation.stop()
    linkGroup.remove()
    nodeGroup.remove()
  }
  resize()
  window.addEventListener("resize", resize)

  return { tick: lightTick, resize, setData, play, pause, destroy }
}

function addDrag(simulation: Simulation<NodeData, LinkData>) {
  function dragStart(event: any, d: SimulationNodeDatum) {
    if (!event.active) {
      simulation.alphaTarget(0.3).restart()
    }
    d.fx = d.x
    d.fy = d.y
  }
  function dragged(event: any, d: SimulationNodeDatum) {
    d.fx = event.x
    d.fy = event.y
  }
  function dragEnd(event: any, d: SimulationNodeDatum) {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
  }
  return drag<SVGCircleElement, NodeData>()
    .on("start", dragStart)
    .on("drag", dragged)
    .on("end", dragEnd)
}

/**
 * generateData creates random graph data based on the input parameters.
 */
function generateData({
  nodes: nodeParam,
  groups: groupParam = 1,
  intergroupLinks = 0,
  intragroupLinks = 0,
}: DataParams) {
  const nodes: NodeData[] = Array.from({ length: nodeParam }, (_, i) => ({
    id: i,
    x: 0,
    y: 0,
    active: false,
  }))
  const links: LinkData[] = []
  const groupCount = constrain(groupParam, 1, nodeParam)
  const groupSize = Math.floor(nodes.length / groupCount)
  const groups = chunk(nodes, groupSize)

  const existingLinks = new Set<string>()

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]

    // Generate links between nodes in a group. Ensure each node has at least
    // one link.
    for (let j = 0; j < group.length; j++) {
      const source = group[j]
      const target = group[(j + 1) % group.length]
      // findCandidate(
      //   () => randomItem(group),
      //   (n) => n !== source && !existingLinks.has(`${source.id}-${n.id}`)
      // ) || group[(j + 1) % group.length]

      links.push({
        id: links.length.toString(),
        strength: 1.0,
        distance: 35,
        source: source.id,
        target: target.id,
      })
      existingLinks.add(`${source.id}-${target.id}`)
    }

    // Now, randomly generate a few extra links between nodes in the group.
    for (let j = 0; j < intragroupLinks; j++) {
      const [source, target] =
        findCandidate(
          () => [randomItem(group), randomItem(group)],
          ([source, target]) =>
            source !== target && !existingLinks.has(`${source.id}-${target.id}`)
        ) || []
      if (source === undefined || target === undefined) {
        console.log("skipping!")
        continue
      }

      links.push({
        id: links.length.toString(),
        strength: 0.1,
        distance: 35,
        source: source.id,
        target: target.id,
      })
      existingLinks.add(`${source.id}-${target.id}`)
    }
  }

  // Generate links between nodes in different groups.
  for (let j = 0; j < intergroupLinks; j++) {
    const sourceGroup = groups[j]
    const targetGroup = groups[(j + 1) % groups.length]

    const [source, target] =
      findCandidate(
        () => [randomItem(sourceGroup), randomItem(targetGroup)],
        ([source, target]) => !existingLinks.has(`${source.id}-${target.id}`)
      ) || []
    if (source === undefined || target === undefined) {
      continue
    }

    links.push({
      id: links.length.toString(),
      strength: 1.0,
      distance: 45,
      source: source.id,
      target: target.id,
    })
  }

  return { nodes, links, tickCount: 0 }
}

function chunk<T>(array: T[], size: number) {
  const chunked = []
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size))
  }
  return chunked
}

/**
 * findCandidate runs a candidate function until it returns a value that passes
 * the validation function. If it doesn't find a valid value after a certain
 * number of iterations, it returns undefined.
 */
function findCandidate<T>(
  candidate: () => T,
  valid: (t: T) => boolean,
  iterations = 10
) {
  let i = 0
  while (i < iterations) {
    const c = candidate()
    if (valid(c)) {
      return c
    }
    i++
  }
  return undefined
}
