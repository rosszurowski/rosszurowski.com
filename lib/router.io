"use strict";

var config = require('./config');
var debug = require('debug')('router');

var fs = require('mz/fs');
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

	// Basic Middleware
	router.use(cache());
	router.use(errors());
	
	// Serve public files
	router.use(serve(__public));
	
	// Twig middleware
	router.use(locals());
	
	// Mount controllers
	let socket = new Socket(config.SOCKET_PORT);
	
	router.use(mount('/live', socket.callback()));
	router.use(mount('/experiments', experiments.callback()));
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
		
		let pages = [
			{ template: 'project', title: 'hi', year: 2015 },
			{ template: 'project', title: 'dawg', year: 2018 },
			{ template: 'information', title: 'yo' }
		];
		this.state.pages = pages;
		
		this.state.now = Date.now();
		this.state.url = this.url;
		yield next;
		
	}
}