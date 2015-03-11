"use strict";

var fs = require('mz/fs');
var join = require('path').join;
var send = require('koa-send');

/**
 * Serve a file of a given page
 * @param {String} root
 * @param {String} slug
 * @param {String} path
 * @returns {Response}
 */
module.exports = function * (ctx, root, slug, url) {

	if (url.startsWith('.')) return;
	if (url.endsWith('yml')) return;

	let path = join(root, slug, url);
	let stat = fs.lstat(path);
	
	try {
		stat = yield stat;
	} catch(err) {
		if ('ENOENT' === err.code) return;
		else throw err;
	}
	
	if (!stat.isFile()) return;
	return yield send(ctx, path);

}