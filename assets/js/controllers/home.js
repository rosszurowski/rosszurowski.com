"use strict";

var NUM_FIELDS = 40;

var canvas, parent, ctx, tmp;
var timer, pixels, fields;
var i, n, v, d;
var w, h;

var buf, buf8, data;

var Field = require('../sketches/helpers/circle');
var bandpass = require('../sketches/helpers/bandpass');

/**
 * Route to match
 */
exports.route = '/';

/**
 * Entry function
 */
exports.in = function () {
	parent = document.querySelector('[data-view]');
	canvas = document.createElement('canvas');
	tmp = document.createElement('canvas').getContext('2d');

	parent.appendChild(canvas);
	window.on('resize', resize);
	resize();

	ctx = canvas.getContext('2d');
	
	fields = [];
	for (i = 0; i < NUM_FIELDS; ++i) {
		fields.push(new Field(
			tmp,
			Math.random() * canvas.width,
			Math.random() * canvas.height,
			Math.random() * 180 + 30
		));
	}
	
	if (!timer) loop();
}

/**
 * Exit function
 */
exports.out = function () {
	window.off('resize', resize);
	parent.removeChild(canvas);
	if (timer) {
		cancelAnimationFrame(timer);
		timer = null;
	}
	canvas = null;
	parent = null;
}

function resize() {
	w = tmp.canvas.width = canvas.width = parent.clientWidth;
	h = tmp.canvas.height = canvas.height = parent.clientHeight;
}

function loop() {
	render();
	timer = requestAnimationFrame(loop);
}

function render() {
	ctx.clearRect(0, 0, w, h);
	tmp.clearRect(0, 0, w, h);
	for (var field of fields) {
		field.update();
		field.render(tmp);
	}
	pixels = tmp.getImageData(0, 0, w, h);
	pixels = bandpass(pixels);
	ctx.putImageData(pixels, 0, 0);
	// ctx.drawImage(tmp.canvas, 0, 0);
}