function Vector(x, y) {
	if (typeof x === "object") {
		this.x = x.x||0
		this.y = x.y||0
	} else {
		this.x = x||0
		this.y = y||0
	}
}

//shorthand it for better minification
var vec = Vector.prototype

Vector.create = () => new Vector()

/**
* Returns a new instance of Vector with
* this vector's components.
* @return {Vector} a clone of this vector
*/
vec.clone = function () {
	return new Vector(this.x, this.y)
}

/**
* Copies the x, y components from the specified
* Vector. Any undefined components from `otherVec`
* will default to zero.
*
* @param  {otherVec} the other Vector to copy
* @return {Vector}  this, for chaining
*/
vec.copy = function (otherVec) {
	this.x = otherVec.x||0
	this.y = otherVec.y||0
	return this
}

/**
* A convenience function to set the components of
* this vector as x and y. Falsy or undefined
* parameters will default to zero.
*
* You can also pass a vector object instead of
* individual components, to copy the object's components.
*
* @param {Number} x the x component
* @param {Number} y the y component
* @return {Vector}  this, for chaining
*/
vec.set = function (x, y) {
	if (typeof x === "object") {
		this.x = x.x||0
		this.y = x.y||0
	} else {
		this.x = x||0
		this.y = y||0
	}
	return this
}

vec.add = function (v) {
	this.x += v.x
	this.y += v.y
	return this
}

vec.subtract = function (v) {
	this.x -= v.x
	this.y -= v.y
	return this
}

vec.multiply = function (v) {
	this.x *= v.x
	this.y *= v.y
	return this
}

vec.scale = function (s) {
	this.x *= s
	this.y *= s
	return this
}

vec.divide = function (v) {
	this.x /= v.x
	this.y /= v.y
	return this
}

vec.negate = function () {
	this.x = -this.x
	this.y = -this.y
	return this
}

vec.rotate = function (center, deg) {
	var radians = (Math.PI / 180) * deg
	var cos = Math.cos(radians)
	var sin = Math.sin(radians)
	this.x = (cos * (this.x - center.x)) + (sin * (this.y - center.y)) + center.x
	this.y = (cos * (this.y - center.y)) - (sin * (this.x - center.x)) + center.y
	return this
}

vec.distance = function (v) {
	var dx = v.x - this.x,
			dy = v.y - this.y
	return Math.sqrt(dx*dx + dy*dy)
}

vec.distanceSq = function (v) {
	var dx = v.x - this.x,
		dy = v.y - this.y
	return dx*dx + dy*dy
}

vec.length = function () {
	var x = this.x,
	y = this.y
	return Math.sqrt(x*x + y*y)
}

vec.lengthSq = function () {
	var x = this.x,
	y = this.y
	return x*x + y*y
}

vec.normalize = function () {
	var x = this.x,
	y = this.y
	var len = x*x + y*y
	if (len > 0) {
		len = 1 / Math.sqrt(len)
		this.x = x*len
		this.y = y*len
	}
	return this
}

vec.dot = function (v) {
	return this.x * v.x + this.y * v.y
}

//Unlike Vector3, this returns a scalar
//http://allenchou.net/2013/07/cross-product-of-2d-vectors/
vec.cross = function (v) {
	return this.x * v.y - this.y * v.x
}

vec.lerp = function (v, t) {
	var ax = this.x,
	ay = this.y
	t = t||0
	this.x = ax + t * (v.x - ax)
	this.y = ay + t * (v.y - ay)
	return this
}

vec.transformMat3 = function (mat) {
	var x = this.x, y = this.y, m = mat.val
	this.x = m[0] * x + m[3] * y + m[6]
	this.y = m[1] * x + m[4] * y + m[7]
	return this
}

vec.transformMat4 = function (mat) {
	var x = this.x,
	y = this.y,
	m = mat.val
	this.x = m[0] * x + m[4] * y + m[12]
	this.y = m[1] * x + m[5] * y + m[13]
	return this
}

vec.reset = function () {
	this.x = 0
	this.y = 0
	return this
}

vec.sub = vec.subtract

vec.mul = vec.multiply

vec.div = vec.divide

vec.dist = vec.distance

vec.distSq = vec.distanceSq

vec.len = vec.length

vec.lenSq = vec.lengthSq

vec.toString = () => `Vector(${this.x}, ${this.y})`

vec.random = function (scale) {
	scale = scale || 1.0
	var r = Math.random() * 2.0 * Math.PI
	this.x = Math.cos(r) * scale
	this.y = Math.sin(r) * scale
	return this
}

vec.str = vec.toString

export default Vector
