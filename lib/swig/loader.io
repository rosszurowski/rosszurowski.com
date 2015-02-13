/**
 * A filesystem loader for swig that doesn't require extensions
 */

var fs 		= require('fs');
var path 	= require('path');

module.exports = function(basepath, encoding) {

	var exports = {};

	encoding = encoding || 'utf8';
	basepath = (basepath) ? path.normalize(basepath) : null;

	exports.resolve = function(to, from) {
		if (basepath) {
			from = basepath;
		} else {
			from = (from ? path.dirname(from) : process.cwd());
		}
		return path.resolve(from, to);
	}

	exports.load = function (identifier, cb) {
		if (!fs || (cb && !fs.readFile) || !fs.readFileSync) {
			throw new Error('Unable to find file ' + identifier + ' because there is no filesystem to read from.');
		}

		identifier = exports.resolve(identifier);

		// If there's no extension, assume .twig
		if (!~['.html', '.twig', '.swig'].indexOf(path.extname(identifier))) {
			identifier += '.twig';
		}

		if (cb) {
			fs.readFile(identifier, encoding, cb);
			return;
		}
		return fs.readFileSync(identifier, encoding);
	};

	return exports;

}