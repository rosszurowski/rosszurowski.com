"use strict";

/**
 * A wrapper around a `ws` Server for creating a socket
 */

var assert = require('assert');
var Socket = require('ws').Server;
var Client = require('./client');

class Server {
	
	constructor(port) {
		assert(typeof port === 'number', 'PORT must be a number');
		
		this.socket = new Socket({ port: port });
		this.clients = new Set();

		this.socket.on('connection', connection.bind(this));
	}
	
	broadcast(source, message) {
		for (let client of this.clients) {
			if (source.id === client.id) continue;
			client.send(message);
		}
	}
	
	callback() {
		return function *() {
			this.body = 'Please connect via the WebSocket protocol';
		}
	}
	
}

module.exports = Server;


/**
 * Client has connected
 * @param {Socket} connection
 */
function connection(connection) {
	let client = new Client(connection);
	client.on('message', receive.bind(this));
	client.on('close', disconnect.bind(this));
	this.clients.add(client);
	console.log('Connect:'.gray, client.id);
}

/**
 * Receive message from client
 * @param {Client} client
 * @param {String} message
 */
function receive(client, message) {
	this.broadcast(client, message);
}

function disconnect(client) {
	this.clients.delete(client);
	console.log('Disconnect:'.gray, client.id);
}