"use strict";

var config = require('../config');
var debug = require('debug')('controller:pages');

var fs = require('mz/fs');
var join = require('path').join;
var merge = require('merge');

var serve = require('../helpers/serve');
var shared = require('../helpers/shared');
var Page = require('../models/page');

module.exports = function (root) {
	
	return function *(next) {
		
		let pages = yield hash(root);
		let page = yield resolve(pages, this.url);
		if (!page) return yield next;
		
		let resource = this.url;
		resource = resource.replace(page.slug, '');
		resource = resource.replace(/\/+/g, '/');
		
		// Serve the file, if we're requesting one.
		if ('/' !== resource) {
			return yield serve(this, root, page.slug, resource);
		}
		
		// Locals
		this.state = merge(this.state, yield shared());
		this.state['pages'] = pages.map(page => page.locals(pages));
		this.state['page'] = page.locals(pages);
		
		debug(page);
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
 * @param {Array} pages
 * @param {String} url
 * @returns {String} path
 */
function *resolve(pages, url) {

	url = url.replace(/(^\/|\/$)/g, ''); // remove leading/trailing slashes
	url = url.split('/').shift(); // get first segment

	let page;
	let results = pages.filter((page) => url === page.slug);
	
	if (results.length) page = results.pop();
	else if (url === '') page = pages.filter((page) => 'home' === page.slug).pop();
	else if (url === 'home') page = undefined;

	return page;

}