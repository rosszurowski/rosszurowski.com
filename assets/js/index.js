var Router = require('./lib/router');
var Socket = require('./lib/socket');

var throttle = require('component/throttle');

document.on('DOMContentLoaded', function () {
	
	var router = new Router()
		.on('/', handleHome)
		.on('/:project/', handleProject)
		.start();
	
	function handleHome() {
		
		console.log('home');
		var container = document.find('.graphic');
		var canvas = document.createElement('canvas');
		container.appendChild(canvas);
		
		window.on('resize', resize, false);
		resize();
		
		function resize() {
			canvas.width = container.clientWidth;
			canvas.height = container.clientHeight;
		}
		
	}
	
	function handleProject() {
		console.log('project');
	}
	
	// var host = window.document.location.host.replace(/:.*/, '');
	// var socket = new Socket(host + ':8081/live');
	// var field = document.querySelector('input[type="text"]');
	// 
	// socket.on('message', function (message) {
	// 	console.log(message);
	// });
	// 
	// document.addEventListener('mousemove', throttle(mousemove, 250));
	// 
	// function mousemove(e) {
	// 	socket.send({
	// 		x: e.clientX,
	// 		y: e.clientY
	// 	});
	// }
	
});
