"use strict";

var config = require('./config');

var http = require('http');
var mount = require('koa-mount');
var router = require('koa-router')();
var serve = require('koa-static');

var swig = require('./swig/renderer');
var loader = require('./swig/loader');
var filters = require('./swig/filters');

var page = require('./page');
var Socket = require('./socket/server');

module.exports = function (app) {
	
	router.use(function *(next) {
		let start = Date.now();
		yield next;
		let end = Date.now();
		console.log(`${end - start}ms`);
	})
	
	// Error middleware
	router.use(error);
	router.use(missing);
	
	// Serve public files
	router.use(serve(__public));
	
	// Mount controllers
	let socket = new Socket(config.SOCKET_PORT);
	
	router.use(mount('/live', socket.callback()));
	router.use(page(__content));

	// Use Swig for templates
	swig(app, {
		ext: 'twig',
		loader: loader(__views),
		cache: 'production' === config.ENV ? 'memory' : false,
		filters: filters });

	// Send back all the routes	
	return router.routes();
	
}





// 404 handler
function * missing(next) {
	yield next;
	if (this.response.body) return;
	if (this.response.status !== 404) return;
	this.throw(404);
}

// Error handler
function * error(next) {
	try { yield next; }
	catch(err) {
		this.status = err.status || 500;
		this.app.emit('error', err, this);
		switch (this.accepts('html', 'text', 'json')) {
			case 'text':
				if ('development' === config.ENV) this.body = err.message;
				else throw err;
				break;
			case 'json':
				if ('development' === config.ENV) this.body = { error: err.message };
				else this.body = { error: http.STATUS_CODES[this.status] }
				break;
			case 'html':
				this.body = yield this.render('404', {
					env: config.ENV,
					ctx: this,
					request: this.request,
					response: this.response,
					error: err.message,
					stack: err.stack,
					status: this.status,
					code: err.code
				});
				break;
		}
	}
}