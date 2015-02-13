"use strict";

var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('socket:client')
var uuid = require('node-uuid');

class Client extends EventEmitter {
	
	constructor(socket) {
		
		super();
		
		this.id = uuid.v4();
		this.socket = socket;
		
		socket.on('message', receive.bind(this));
		socket.on('close', close.bind(this));
		
		debug('Constructed client');
		debug('Sending handshake...');
		this.send({ type: 'handshake', id: this.id });

	}
	
	send(message) {
		message = JSON.stringify(message);
		this.socket.send(message);
	}

}

module.exports = Client;

/**
 * Parse message and pass it to any listeners
 * @param {String} message
 */
function receive(message) {
	try {
		message = JSON.parse(message);
	} catch(e) {
		console.error('Could not parse JSON message:', message);
		return;
	}
	this.emit('message', this, message);
}

function close() {
	this.emit('close', this);
}