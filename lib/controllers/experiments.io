"use strict";

var debug = require('debug')('controller:experiments');

var fs = require('mz/fs');
var join = require('path').join;
var merge = require('merge');

var serve = require('../helpers/serve');
var shared = require('../helpers/shared');

var Experiment = require('../models/experiment');

/**
 * A controller for routing experiments
 * 
 *   GET /:slug/        => wrapped experiment
 *   GET /:slug/frame   => raw experiment
 */
module.exports = function (root, frame) {
	
	frame = frame || 'frame';
	
	return function * (next) {
		
		let experiments = yield hash(root);
		if (!experiments.length) return yield next;
		let experiment = yield resolve(experiments, this.url);
		if (!experiment) return yield next;
		
		// respond with resource (if need be)
		let resource = this.url;
		resource = resource.replace(experiment.slug, ''); // normalize resource url
		resource = resource.replace(/\/+/g, '/'); // remove duplicate slashes
		resource = resource.replace(/(^\/|\/$)/g, ''); // remove trailing slashes
		
		// Serve the file if we're requesting a resource.
		switch (resource) {
			case '':
				break;
			case frame: // Only experiment
				return yield serve(this, root, experiment.slug, experiment.data.frame || 'index.html');
				break;
			default: // Resource
				return yield serve(this, root, experiment.slug, resource);
				break;
		}
		
		// Locals
		this.state = merge(this.state, yield shared());
		this.state['experiments'] = experiments.map(exp => exp.locals);
		this.state['experiment'] = experiment.locals;
		
		debug(experiment);
		this.body = yield this.render('experiments');

	}
}

var unsafe = /[^.a-z0-9_-]/gi;

/**
 * Construct a hash of all experiments
 */
function *hash(root) {
	
	let list = yield fs.readdir(root);
	list = list.filter((path) => !path.startsWith('.')); // no hidden files
	list = list.filter((path) => !unsafe.test(path)); // no unsafe urls
	let stats = yield list.map((path) => fs.lstat(join(root, path)));
	list = list.filter((path, i) => stats[i].isDirectory()); // only directories
	
	// convert to page objects
	list = list.map(path => new Experiment(root, path));
	yield  list.map(exp  => exp.read());
	
	return list;

}

/**
 * Resolve a URL to an experiment, defaulting to the most recent
 * @param {Array} exps
 * @param {String} url
 * @returns {String} path
 */
function *resolve(exps, url) {
	
	url = url.replace(/(^\/|\/$)/g, ''); // remove leading/trailing slashes
	url = url.split('/').shift(); // get first segment

	let results = exps.filter((exp) => url === exp.slug);
	let result;

	if (results.length) result = results.pop();
	else if (url === '') result = exps[0];

	return result;

}