/**
 * A canvas helper class for drawing circles
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 * @returns {Circle}
 */

var EASE = 24;
var PI = Math.PI;
var TWO_PI = PI * 2;

function Circle(ctx, x, y, radius) {
	if (!(this instanceof Circle)) {
		throw new TypeError("Cannot call a class as a function");
	}
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.angle = random(0, TWO_PI);
	this.speed = random(4, 8);
	this.fill = ctx.createRadialGradient(
		0, 0, 0,
		0, 0, radius);
	this.fill.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
	this.fill.addColorStop(0.9, 'rgba(255, 255, 255, 0.0)');
}

Circle.prototype.update = function () {
	this.angle = random(-PI, PI);
	this.speed += (random(4, 8) - this.speed) / EASE;
	this.x += (this.speed * Math.cos(this.angle)) / EASE;
	this.y += (this.speed * Math.sin(this.angle)) / EASE;
}

Circle.prototype.repel = function (x, y) {
	
}

Circle.prototype.render = function (ctx) {
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.fillStyle = this.fill;
	ctx.globalCompositeOperation = 'screen';
	ctx.beginPath();
	ctx.arc(0, 0, this.radius, 0, TWO_PI, false);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
}

/**
 * Export the module
 */
module.exports = Circle;


function random(min, max) {
	return Math.random() * (max - min) + min;
}