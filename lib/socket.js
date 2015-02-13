"use strict";

/**
 * A wrapper around a `ws` Server for creating a socket
 */

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


/**
 * Client has connected
 * @param {Socket} socket
 */
function connection(socket) {
	this.clients.add(socket);
	socket.on('message', message)
	console.log('New client');
}

/**
 * Receive message from client
 * @param {String} email
 */
function message() {
	console.log(Array.from(arguments));
}

function disconnection(socket) {
	
}