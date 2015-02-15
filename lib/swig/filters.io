"use strict";

var url  = require('url');
var crypto = require('crypto');
var markdown = require('marked');

/**
 * Parse the given content as Markdown
 * @param {String} input
 * @returns {String} output
 */
exports.markdown = function (input) {
	return markdown(input);
}

/**
 * Filter an input collection based upon a given property and expected value
 * @param {Array} input
 * @param {String} prop
 * @param {String} value
 * @returns {Array} output
 */
exports.where = function (input, prop, value) {
	if (!Array.isArray(input)) throw new Error('Tag `filter` used on non-array');
	return input.filter((obj) => obj[prop] === value);
}

/**
 * Sort an input collection based on a given propery and order
 * @param {Array} input
 * @param {String} prop
 * @param {String} order
 * @returns {Array} output
 */
exports.sort = function (input, prop, order) {
	if (!Array.isArray(input)) throw new Error('Tag `sort` used on non-array');
	
	order = order || 'ASC';
	order = order.toUpperCase();
	if (order !== 'ASC' && order !== 'DESC') throw new Error(`Unknown sort order \`${order}\``);
	
	let result = input.sort((ao, bo) => {
		let a = ao[prop];
		let b = bo[prop];
		return order === 'DESC'
			? a > b ? -1 : 1
			: a < b ? -1 : 1;
	});
	
	return result;
}

/**
 * Returns a domain name from a URL
 * @param {String} url
 * @returns {String}
 */
exports.domain = function (input) {
	if (!input) return '';
	return url.parse(input, false, true).host;
}

/**
 * Strips the domain hostname from a URL
 * @param {String} url
 * @returns {String}
 */
exports.stripDomain = function (input) {
	if (!input) return '';
	return url.parse(input, false, true).path;
}

/**
 * Hash a string to an MD5 hash
 * @param {String} input
 * @returns {String}
 */
exports.md5 = function (input) {
	return crypto.createHash('md5').update(input).digest('hex');
}

// Helper function for checking objects
Object.isObject = function (obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}