
import randf from 'randf'

const RADIUS = 1
const TWO_PI = Math.PI * 2.0
const ATTRACT_RADIUS = 95

export function create (opts) {

	return {

		parent: opts.parent,
		id: opts.id,

		radius: randf(RADIUS, RADIUS * 1.5),
		mass: randf(RADIUS, RADIUS * 2),
		q: 0.5,
		damping: 0.95,

		position: {
			x: opts.x,
			y: opts.y
		},
		velocity: {
			x: 0,
			y: 0
		},
		acceleration: {
			x: 0,
			y: 0
		}

	}

}

export function repel(p1, p2) {
	if (p1.id === p2.id) return
	const d = distanceSquared(p1, p2)
	const e = p2.q / d
	const p = p1.q * p2.q / (d * d * d)
	const force = (p1.q * e) + p
	const accel = (force / p1.mass) * 6.0
	if (d > 2.0) {
		p1.acceleration.x += accel * (p1.position.x - p2.position.x) / d
		p1.acceleration.y += accel * (p1.position.y - p2.position.y) / d
	}
}

export function attract (p, pt) {
	const dsq = distanceSquared(p, { position: { x: pt.x, y: pt.y }})
	const d = Math.sqrt(dsq)
	const mass = 0.05 * (d/100)
	const q = mass * 2.0
	const e = p.q / dsq
	const pp = Math.abs(q) * Math.abs(p.q) / (d * d * d)
	const force = (q * e) + pp
	const accel = (force / p.mass) * .0
	if (d > ATTRACT_RADIUS) {
		p.acceleration.x += accel * (pt.x - p.position.x)
		p.acceleration.y += accel * (pt.y - p.position.y)
	} else {
		const pen = ATTRACT_RADIUS - d
		if (pen > 1) {
			const gravityVector = { x: pt.x, y: pt.y }
			const particleVector = { x: p.position.x, y: p.position.y }
			const velocityVector = { x: p.velocity.x, y: p.velocity.y }
			const difference = normalize({
				x: gravityVector.x - particleVector.x,
				y: gravityVector.y - particleVector.y
			})
			const twovdotn = dot(velocityVector, difference) * 2
			const twovdotnn = { x: difference.x * twovdotn, y: difference.y * twovdotn }
			const velocity = {
				x: (velocityVector.x - twovdotnn.x) * 0.7,
				y: (velocityVector.y - twovdotnn.y) * 0.7
			}
			// console.log(twovdotn)
			p.velocity.x = velocity.x
			p.velocity.y = velocity.y
			p.acceleration.x += accel * (pt.x - p.position.x)
			p.acceleration.y += accel * (pt.y - p.position.y)
		} else {
			p.velocity.x = p.velocity.y = 0
		}
	}
}

export function update (particle) {
	let { parent, position, velocity, acceleration, damping } = particle
	velocity.x += acceleration.x
	velocity.y += acceleration.y
	position.x += velocity.x * damping
	position.y += velocity.y * damping
	acceleration.x = 0
	acceleration.y = 0

}

export function draw (particle, ctx) {
	ctx.beginPath()
	ctx.arc(particle.position.x, particle.position.y, particle.radius, 0, TWO_PI)
	ctx.fill()
	ctx.closePath()
}

function distanceSquared (p1, p2) {
	const dX = p2.position.x - p1.position.x
	const dY = p2.position.y - p1.position.y
	return dX * dX + dY * dY
}

function dot(a, b) {
	return a.x * b.x + a.y * b.y
}

function magnitude (v) {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

function normalize (v) {
	const length = magnitude(v)
	return {
		x: v.x / length,
		y: v.y / length
	}
}