"use strict";



module.exports = function (parent) {

	var canvas = document.createElement('canvas');
	parent.appendChild(canvas);

	window.on('resize', resize, false);
	resize();

}

document.on('DOMContentLoaded', function () {

	var container = document.find('.graphic');
	var canvas = document.createElement('canvas');
	container.appendChild(canvas);

	function resize() {
		canvas.width = container.clientWidth;
		canvas.height = container.clientHeight;
	}

	function render() {

	}

});