"use strict";

var config = require('../config');
var debug = require('debug')('controller:pages');

var fs = require('mz/fs');
var join = require('path').join;
var merge = require('merge');
var send = require('koa-send');
var yaml = require('yamljs');

var Page = require('../models/page');

module.exports = function (root) {
	
	return function *(next) {
		
		// build pages hash
		let pages = yield hash(root);
		// resolve current page
		let page = yield resolve(pages, this.url);
		if (!page) return yield next;
		
		// respond with resource (if need be)
		let resource = this.url;
		resource = resource.replace(page.slug, '');
		resource = resource.replace(/\/+/g, '/');
		
		// Serve the file if we're requesting a resource.
		if ('/' !== resource) {
			if (resource.startsWith('.')) return yield next;
			if (resource.endsWith('yml')) return yield next;
			let path = join(root, page.slug, resource);
			let stat = fs.lstat(path);
			try {
				stat = yield stat;
			} catch(err) {
				if ('ENOENT' === err.code) return yield next;
				else throw err;
			}
			if (!stat.isFile()) return yield next;
			return yield send(this, path);
		}
		
		// Locals
		let shared = yaml.parse(yield fs.readFile(__shared, 'utf8'));
		this.state = merge(this.state, shared);
		this.state.pages = pages.map(page => page.locals);
		this.state.page = page.locals;
		
		console.log(page);
		yield page.render(this);
		
	}
	
}


var unsafe = /[^.a-z0-9_-]/gi;

/**
 * Construct hash of all pages in the site
 */
function *hash(root) {
	
	let pages = yield fs.readdir(root);
	pages = pages.filter((path) => !path.startsWith('.')); // no hidden files
	pages = pages.filter((path) => !unsafe.test(path)); // no unsafe urls
	let stats = yield pages.map((path) => fs.lstat(join(root, path)));
	pages = pages.filter((path, i) => stats[i].isDirectory()); // only directories
	
	// convert to page objects
	pages = pages.map(path => new Page(root, path));
	yield   pages.map(page => page.read());
	pages = pages.filter(page => page.manifest); // only pages with a yml index
	
	return pages;
}

/**
 * Resolve a URL to a folder
 * @param {Array} pagse
 * @param {String} url
 * @returns {String} path
 */
function *resolve(pages, url) {

	url = url.replace(/(^\/|\/$)/g, ''); // remove leading/trailing slashes
	url = url.split('/').shift(); // get first segment

	let results = pages.filter((page) => url === page.slug);
	let page;
	
	if (results.length) page = results.pop();
	else if (url === '') page = pages.filter((page) => 'home' === page.slug).pop();
	else if (url === 'home') page = undefined;

	return page;
}