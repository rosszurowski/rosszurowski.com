
/**
 * Vector helper class
 */
export default class Vector {

	constructor(x, y) {
		if (x == void 0) {
			throw new Error('Must pass values to create a Vector')
			return
		}
		if (typeof x === 'number') {
			this.x = x
			this.y = y
		} else {
			this.x = x.x
			this.y = x.y
		}
	}

	static zero() {
		return new Vector(0, 0)
	}

	add(vector) {
		const x = this.x + vector.x
		const y = this.y + vector.y
		return new Vector(x, y)
	}

	subtract(vector) {
		const x = this.x - vector.x
		const y = this.y - vector.y
		return new Vector(x, y)
	}

	multiply(scalar) {
		const x = this.x * scalar
		const y = this.y * scalar
		return new Vector(x, y)
	}

	divide(scalar) {
		const x = this.x / scalar
		const y = this.y / scalar
		return new Vector(x, y)
	}

	dot(vector) {
		const x = this.x * vector.x
		const y = this.y * vector.y
		return x + y
	}

	magnitude() {
		return Math.sqrt(this.dot(this))
	}

	distanceSquared(point) {
		const x = point.x - this.x
		const y = point.y - this.y
		return (x * x) + (y * y)
	}

	distance(point) {
		return Math.sqrt(distanceSquared(point))
	}

	normalized() {
		const mag = this.magnitude()
		const x = this.x / mag
		const y = this.y / mag
		return new Vector(x, y)
	}

}