var Router = require('./lib/router');
var Socket = require('./lib/socket');

var throttle = require('component/throttle');

document.on('DOMContentLoaded', function () {
	
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
