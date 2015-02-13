"use strict";

var fs = require('mz/fs');
var yaml = require('yamljs');
var join = require('path').join;
var merge = require('merge');

var config = require('./config');

module.exports = function (root) {
	
	return function *(next) {
		
		let page = yield resolve(root, this.url);
		
		if (!page) return yield next;
		
		let files = yield fs.readdir(join(root, page));
		let index = files.filter(path => path.endsWith('yml')).shift();
		
		let metadata = yaml.parse(yield fs.readFile(join(root, page, index), 'utf8'));
		let site = yaml.parse(yield fs.readFile(join(root, '_site.yml'), 'utf8'));
		
		let template = index.split('.').shift();
		
		let locals = {};
		locals[template] = metadata;
		locals['site'] = site;
		
		this.body = yield this.render(template, locals);
	}
	
}

var unsafe = /[^.a-z0-9_-]/gi;

/**
 * Resolve a URL to a folder
 * @param {String} root
 * @param {String} url
 * @returns {String} path
 */
function *resolve(root, url) {
	
	url = url.replace(/(^\/|\/$)/g, '')
	
	let pages = yield fs.readdir(root);
	pages = pages.filter(path => !path.startsWith('.')); // no hidden files
	pages = pages.filter(path => !unsafe.test(path)); // no unsafe urls
	pages = pages.filter(path => pages.length);
	
	// lstat the remaining files and get the directories
	let stats = yield pages.map(path => fs.lstat(join(root, path)));
	pages = pages.filter((path, i) => stats[i].isDirectory());
	
	// see which one matches the url
	pages = pages.filter(path => url.startsWith(path));
	
	let page = pages.pop();
	
	return page;
}