
import randf from 'randf'
import Vector from './vector'

const RADIUS = 1
const TWO_PI = Math.PI * 2.0
const ATTRACT_RADIUS = 95

export function create (opts) {

	return {

		parent: opts.parent,
		id: opts.id,

		radius: randf(RADIUS, RADIUS * 1.5),
		mass: randf(RADIUS, RADIUS * 2),
		charge: 0.5,
		damping: 0.99,

		position: new Vector(opts.x, opts.y),
		velocity: Vector.zero(),
		acceleration: Vector.zero()

	}

}

export function repel(p1, p2) {
	if (p1.id === p2.id) return
	const d = p1.position.distanceSquared(p2.position)
	const e = p2.charge / d
	const p = p1.charge * p2.charge / (d * d * d)
	const force = (p1.charge * e) + p
	const accel = (force / p1.mass) * 6.0
	if (d > 1.0) {
		p1.acceleration.x += accel * (p1.position.x - p2.position.x) / d
		p1.acceleration.y += accel * (p1.position.y - p2.position.y) / d
	}
}

export function attract (p, point) {
	const dsq = p.position.distanceSquared(point)
	const d = Math.sqrt(dsq)
	const mass = 0.05 * (d / 100)
	const charge = mass * randf(2.0, 8.0)
	const e = p.charge / dsq
	const pp = Math.abs(charge) * Math.abs(p.charge) / (d * d * d)
	const force = (charge * e) + pp
	const accel = (force / p.mass) * 6.0
	if (d > ATTRACT_RADIUS) {
		p.acceleration.x += accel * (point.x - p.position.x)
		p.acceleration.y += accel * (point.y - p.position.y)
	} else {
		const pen = ATTRACT_RADIUS - d
		// if (pen > 1) {
			const difference = point
				.subtract(p.position)
				.normalized()
			const twovdotn = p.velocity.dot(difference) * 2.0
			const twovdotnn = difference.multiply(twovdotn)
			const velocity = p.velocity
				.subtract(twovdotnn)
				.multiply(0.7)
			p.velocity.x = velocity.x
			p.velocity.y = velocity.y
			p.acceleration.x += accel * (point.x - p.position.x)
			p.acceleration.y += accel * (point.y - p.position.y)
		// } else {
			// p.velocity.x = p.velocity.y = 0
		// }
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
	let { position, radius } = particle
	ctx.beginPath()
	ctx.arc(position.x, position.y, radius, 0, TWO_PI)
	ctx.fill()
	ctx.closePath()
}