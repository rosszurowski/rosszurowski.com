"use strict";

var throttle = require('component/throttle');

var Router = require('./src/router');
var Socket = require('./src/socket');

var controllers = require('./controllers/index');

document.on('DOMContentLoaded', function () {
	
	var router = new Router();
	
	controllers.forEach(function (controller) {
		router
			.on(controller.route)
			.in(controller.in)
			.out(controller.out);
	});

	router.start();
	
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
