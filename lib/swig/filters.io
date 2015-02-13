var url  = require('url');
var crypto = require('crypto');


/**
 * Returns a domain name from a URL
 * @param {String} url
 * @returns {String}
 */
exports.domain = function(input) {
	if (!input) return '';
	return url.parse(input, false, true).host;
}

/**
 * Strips the domain hostname from a URL
 * @param {String} url
 * @returns {String}
 */
exports.stripDomain = function(input) {
	if (!input) return '';
	return url.parse(input, false, true).path;
}

/**
 * Hash a string to an MD5 hash
 * @param {String} input
 * @returns {String}
 */
exports.md5 = function(input) {
	return crypto.createHash('md5').update(input).digest('hex');
}