
'use strict'

import raf from 'component-raf'
import randf from 'randf'
import context from '2d-context'

import Vector from './vector'
import * as particle from './particle'

/**
 * Config
 */
const PARTICLE_COUNT = 250
const PADDING = 10
const deviation = (point, range) => randf(point - (range/2), point + (range/2))

/**
 * Magnetic Fields sketch
 * REMEMBER: heavy contrast == win
 */
export default function (parent, opts) {

	const ctx = context()
	const canvas = ctx.canvas
	let width = 0
	let height = 0
	let center = { x: 0, y: 0 }
	parent.appendChild(ctx.canvas)
	resize()

	if (!ctx) {
		throw new Error('Your browser doesn\'t support the <canvas> element')
	}

	const particles = []

	for (let i = 0; i < PARTICLE_COUNT; i++) {
		particles.push(particle.create({
			parent: canvas,
			id: i,
			x: deviation(center.x, 150),
			y: deviation(center.y, 150)
		}))
	}

	// Kick it off
	bind()
	tick()


	/**
	 * Private methods
	 */

	function bind () {
		window.addEventListener('resize', resize)
		resize()
	}

	function resize (redraw) {
		width  = canvas.width  = window.innerWidth
		height = canvas.height = window.innerHeight
		center = new Vector(width / 2, height / 2)
	}

	function tick () {
		ctx.clearRect(0, 0, width, height)
		ctx.fillStyle = '#000000' // '#EF6875'
		for (const p of particles) {
			for (const pp of particles) {
				if (p === pp) continue
				particle.repel(p, pp)
			}
			particle.attract(p, center)
			particle.update(p)
			particle.draw(p, ctx)
		}
		raf.call(this, tick)
	}

}