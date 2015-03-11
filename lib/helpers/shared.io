"use strict";

var fs = require('mz/fs');
var yaml = require('yamljs');

/**
 * Return an object of shared partials
 */
module.exports = function * () {
	let shared = yaml.parse(yield fs.readFile(__shared, 'utf8'));
	shared['site'] = shared['site'] || {};
	shared['site']['lastModified'] = (yield fs.stat(__root)).mtime;
	return shared;
}