"use strict";

var config = require('./config');
var debug = require('debug')('router');

var fs = require('mz/fs');
var path = require('path');
var http = require('http');
var mount = require('koa-mount');
var router = require('koa-router')();
var serve = require('koa-static');

var swig = require('./swig/renderer');
var loader = require('./swig/loader');
var filters = require('./swig/filters');

var cache = require('./middleware/cache');
var errors = require('./middleware/errors');

var pages = require('./controllers/pages');
var experiments = require('./controllers/experiments');
var Socket = require('./socket/server');

module.exports = function(app) {
	
	router.use(function *(next) {
		let start = Date.now();
		yield next;
		let end = Date.now();
		debug('Response time: %s', `${end - start}ms`.yellow);
	});

	// Error handlers
	router.use(errors());
	
	// Serve public files
	router.use(serve(__public));
	
	// Middleware
	if ('production' === config.ENV)
		router.use(cache());
	router.use(locals());
	
	// Mount controllers
	let socket = new Socket(config.SOCKET_PORT);
	
	router.use(mount('/live', socket.callback()));
	router.use(mount('/experiments', experiments(path.join(__content, 'experiments'))));
	
	router.use(pages(__content));

	// Use Swig for templates
	swig(app, {
		ext: 'twig',
		loader: loader(__views),
		cache: 'production' === config.ENV ? 'memory' : false,
		filters: filters });

	// Send back all the routes	
	return router.routes();
	
}



function locals(opts) {
	return function * (next) {
		
		this.state.now = Date.now();
		this.state.url = this.url;
		
		this.state.join = path.join;
		this.state.relative = path.relative;
		
		yield next;
		
	}
}