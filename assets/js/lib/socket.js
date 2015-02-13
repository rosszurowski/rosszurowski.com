var Emitter = require('component/emitter');

var Socket = module.exports = function(url) {
	this.url = url;
	this.ws = new WebSocket('ws://' + url);
	this.ws.parent = this;
	this.ws.addEventListener('open', open.bind(this));
	this.queue = [];
}

Emitter(Socket.prototype);

Socket.prototype.send = function (data) {
	if (this.ws.readyState !== 4) {
		this.queue.push(data);
	}
	this.ws.send(JSON.stringify(data));
}

function open() {
	this.ws.addEventListener('message', handshake);
	this.emit('open');
}

function handshake(event) {
	var ws = this;
	var data = JSON.parse(event.data);
	if ('handshake' !== data.type)
		throw new Error('Handshake failed');
	ws.id = data.id;
	if (ws.parent.queue.length) {
		ws.parent.queue.forEach(function (data) {
			ws.send(data);
		});
	}
	ws.removeEventListener('message', handshake);
	ws.addEventListener('message', receive.bind(ws.parent));
}

function receive(event) {
	this.emit('message', JSON.parse(event.data));
}