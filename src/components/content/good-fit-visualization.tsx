import { useEffect, useRef, useState } from "react"
import {
  select,
  forceSimulation,
  forceLink,
  forceManyBody,
  Simulation,
  ForceLink,
  forceCollide,
  Selection,
  drag,
  SimulationNodeDatum,
  forceX,
  forceY,
  ForceX,
  ForceY,
} from "d3"
import { constrain, randomItem } from "./utils"
import Icon from "../icon"

/**
 * GoodFitVisualization is a visualization to accompany the "On Good Fit" blog
 * post.
 */
export default function GoodFitVisualization({
  variant = "basic",
  caption,
}: {
  variant: keyof typeof variants
  caption?: string
}) {
  const [params, setParams] = useState(variants[variant])
  const ref = useForceSimulation(params)

  const restart = () => {
    // Generate a new object to force a re-render of the simulation.
    setParams({ ...variants[variant] })
  }

  return (
    <figure>
      <div className="relative rounded-lg bg-stone-100">
        <button
          className="absolute flex items-center text-stone-600 rounded hover:bg-stone-600/5 hover:text-stone-700 transition-colors px-2.5 py-1.5 bottom-2 right-2 text-xs font-medium tracking-tight"
          onClick={() => restart()}
        >
          <Icon
            className="inline-block opacity-75 mr-1.5"
            name="cycle"
            size="0.9em"
          />
          Restart
        </button>
        <svg className="aspect-[7/5] w-full" ref={ref} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

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
    active: true,
  }))
  const groupCount = constrain(groupParam, 1, nodeParam)
  const links: LinkData[] = []
  const groupSize = Math.floor(nodes.length / groupCount)

  for (let i = 0; i < groupCount; i++) {
    const group = nodes.slice(i * groupSize, (i + 1) * groupSize)
    const existingLinks = new Set<string>()

    // Generate links between nodes in a group. Ensure each node has at least
    // one link.
    for (let j = 0; j < group.length; j++) {
      const source = group[j]
      const target = group[(j + 1) % group.length]
      links.push({
        id: links.length.toString(),
        strength: 1.0,
        distance: 35,
        source: source.id,
        target: target.id,
      })
      existingLinks.add(`${source.id}-${target.id}`)
    }

    const possibleConnections = Math.pow(group.length, 2) - 1

    // Now, randomly generate a few extra links between nodes in the group.
    const extraLinks = Math.floor(possibleConnections * intragroupLinks)
    for (let j = 0; j < extraLinks; j++) {
      const [source, target] =
        findCandidate(
          () => [randomItem(group), randomItem(group)],
          ([source, target]) =>
            source !== target && !existingLinks.has(`${source.id}-${target.id}`)
        ) || []
      if (source === undefined || target === undefined) {
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

    // Generate links between nodes in different groups.
    for (let j = 0; j < intergroupLinks; j++) {
      const source = group[j]
      const target = findCandidate(
        () => randomItem(nodes),
        (node) =>
          node !== source &&
          !group.includes(node) &&
          !existingLinks.has(`${source.id}-${node.id}`)
      )
      if (target === undefined) {
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
  }

  return { nodes, links }
}

const variants = {
  basic: {
    nodes: 12,
    intragroupLinks: 0.05,
  },
  "few-connections": {
    nodes: 20,
    intragroupLinks: 0.008,
  },
  "many-connections": {
    nodes: 20,
    intragroupLinks: 0.05,
  },
  groups: {
    nodes: 30,
    groups: 3,
    intragroupLinks: 0.1,
    intergroupLinks: 1,
  },
}

function useForceSimulation(params: DataParams) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const el = ref.current
    let width = el.clientWidth
    let height = el.clientHeight
    const svg = select(el)

    // The maximum width of the visualization in the window. Used for resizing
    // the links between nodes as the browser shrinks.
    const maxWidth = 750
    const radius = 6

    const simulation = forceSimulation<NodeData, LinkData>()
      .force(
        "link",
        forceLink<NodeData, LinkData>()
          .id((d) => d.id)
          .strength((d) => d.strength)
          .iterations(5)
      )
      .force("collision", forceCollide().radius(radius + 2))
      .force("charge", forceManyBody().strength(-150))
      .force("x", forceX(width / 2).strength(0.1))
      .force("y", forceY(height / 2).strength(0.15))
      .on("tick", tick)

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

    const resize = () => {
      width = el.clientWidth
      height = el.clientHeight
      const x = simulation.force("x") as ForceX<NodeData>
      const y = simulation.force("y") as ForceY<NodeData>
      const link = simulation.force("link") as ForceLink<NodeData, LinkData>
      simulation.stop()
      x.x(width / 2)
      y.y(height / 2)
      link.distance((d) => (width / maxWidth) * d.distance)
      simulation.alpha(1.0).restart()
    }

    const update = (data: Data, alpha?: number) => {
      if (!ref.current) {
        return
      }
      const old = new Map(node.data().map((d) => [d.id, d]))
      data.nodes = data.nodes.map((d) => Object.assign(old.get(d.id) || {}, d))
      data.links = data.links.map((d) => Object.assign({}, d))

      node = node
        .data(data.nodes, (d) => d.id)
        .join("circle")
        .attr("r", radius)
        .attr("fill", (d) => (d.active ? "#b2b2b2" : "black"))
        .call(addDrag(simulation))

      link = link.data(data.links).join("line")

      simulation.nodes(data.nodes)
      // @ts-expect-error
      simulation.force("link").links(data.links)
      if (alpha) {
        simulation.alpha(alpha)
      }
      simulation.restart().tick()
    }

    function lightTick() {
      const nodes = node.data()
      // Get the links with the embedded node data.
      // @ts-expect-error
      const links = link.data() as LinkDataNode[]

      let hasActiveNode = false
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.active) {
          hasActiveNode = true
        }
        let hasActiveConnection = false
        for (let j = 0; j < links.length; j++) {
          const link = links[j]
          if (link.source.id !== node.id) {
            continue
          }
          const target = nodes[link.target.id]
          if (target.active) {
            hasActiveConnection = true
            break
          }
        }
        if (hasActiveConnection) {
          node.active = Math.random() > 0.5 ? true : false
        } else {
          // Technically, this should be the following line. But for testing,
          // I'm using a faster approach.
          // node.active = Math.random() > 0.5 ? node.active : false
          node.active = false
        }
        nodes[i] = node
      }
      if (!hasActiveNode) {
        // If we have no active nodes from the previous update, don't change
        // anything about the visualization.
        // TODO: stop the setInterval call once we've ended the simulation.
        return
      }
      // Sets the links with the embedded node data.
      // @ts-expect-error
      update({ nodes, links }, 0.05)
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
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y)
    }

    resize()
    window.addEventListener("resize", resize)
    update(generateData(params), 1.0)
    simulation.tick(200)

    let intervalId: number | null = null
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (!entry) {
        return
      }
      if (entry.isIntersecting) {
        intervalId = window.setInterval(lightTick, 500)
      } else if (intervalId) {
        window.clearInterval(intervalId)
      }
    })
    observer.observe(el)

    return () => {
      simulation.stop()
      linkGroup.remove()
      nodeGroup.remove()
      window.removeEventListener("resize", resize)
      observer.disconnect()
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [params])

  return ref
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
