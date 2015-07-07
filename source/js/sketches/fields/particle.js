
import randf from 'randf'
import Vector from './vector'

const { abs, pow, sqrt } = Math

const RADIUS = randf(0.3, 0.6)
const TWO_PI = Math.PI * 2.0
const ATTRACT_RADIUS = 20

const GRAVITY = 0.05

export function create (opts) {

	return {

		parent: opts.parent,
		id: opts.id,

		radius: randf(RADIUS, RADIUS * 1.5),
		mass: randf(0.5, 1.0),
		charge: 2,
		damping: 0.9,

		position: new Vector(opts.x, opts.y),
		velocity: Vector.zero(),
		acceleration: Vector.zero()

	}

}

export function repel(p1, p2) {
	if (p1.id === p2.id) return
	const distanceSquared = p1.position.distanceSquared(p2.position)
	const distance = sqrt(distanceSquared)
	const e = p2.charge / distanceSquared
	const p = p1.charge * p2.charge / pow(distance, 6)
	const force = (p1.charge * e) + p
	const accel = (force / p1.mass) * 2.0
	if (distance > 2.0) {
		p1.velocity.x += accel * (p1.position.x - p2.position.x) / distance
		p1.velocity.y += accel * (p1.position.y - p2.position.y) / distance
	}
}

export function attract (p, point) {
	const distanceSquared = point.distanceSquared(p.position)
	const distance = sqrt(distanceSquared)
	const mass = 0.05 * (distance / 100)
	const charge = mass * 2
	const e = p.charge / distanceSquared
	const pp = abs(charge) * abs(p.charge) / pow(distance, 3)
	const force = (charge * e) + pp
	const accel = (force / mass) * 6.0
	if (distance > ATTRACT_RADIUS) {
		p.velocity.x += accel * (point.x - p.position.x)
		p.velocity.y += accel * (point.y - p.position.y)
	} else {
		const pen = ATTRACT_RADIUS - distance
		if (pen > 1) {
			const normalized = point
				.subtract(p.position)
				.normalized()
			const velocityDotProduct = p.velocity.dot(normalized)
			const twovdotnn = normalized
				.multiply(velocityDotProduct * 2.0)
			const velocity = twovdotnn
				.subtract(p.velocity)
				.multiply(0.7)
			p.velocity = velocity
			p.velocity.x -= accel * (point.x - p.position.x)
			p.velocity.y -= accel * (point.y - p.position.y)
		} else if (pen <= 1) {
			p.velocity.x = 0
			p.velocity.y = 0
		}
	}
}

export function update (particle) {
	let { parent, position, velocity, acceleration, damping } = particle
	velocity.x += acceleration.x
	velocity.y += acceleration.y
	velocity.x *= damping
	velocity.y *= damping
	position.x += velocity.x
	position.y += velocity.y
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