"use strict";

/**
 * An LRU-based in-memory cache for rendered templates
 */

var merge = require('merge');

var compose = require('koa-compose');
var cash = require('koa-cash');
var lru = require('lru-cache');

const HOURS_FROM_MS = 1000 * 60 * 60;


module.exports = function (opts) {
	
	opts = opts || {};
	opts = merge(opts, {
		max: 500,
		maxAge: 10 * HOURS_FROM_MS,
		length(n) { return n * 2; }
	})
	
	let store = lru(opts);
	let cache = cash({
		*get(key) { return store.get(key); },
		*set(key, value) { return store.set(key, value) }
	});
	
	return compose([cache, check]);

}

function *check(next) {
	if (yield this.cashed()) return;
	yield next;
}