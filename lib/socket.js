"use strict";

var assert = require('assert');
var Server = require('ws').Server;

class Socket {
	
	constructor(port) {
		assert(typeof port === 'number', 'PORT must be a number');
		
		this.server = new Server({ port: port });
		this.clients = new Set();

		this.server.on('connection', connection.bind(this));
		this.server.on('disconnection', disconnection.bind(this));
	}
	
	callback() {
		return function *() {
			console.log('hello');
			this.body = 'Please connect via the WebSocket protocol';
		}
	}
	
}

module.exports = Socket;


function connection(socket) {
	this.clients.add(socket);
	console.log('New client');
}

function disconnection(socket) {
	
}