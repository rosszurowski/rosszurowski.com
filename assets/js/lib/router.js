'use strict';

/**
 * Initials
 */

var pop = 'state' in window.history ? true : false;
var bound = false;

/**
 * All the routers
 */

var routers = [];

/**
 * Exports
 */
module.exports = Router;




/**
 * Initialize a new `Router`.
 */

function Router() {
	if (!(this instanceof Router)) return new Router;
	routers.push(this);
	this.routes = [];
	bind();
}

/**
 * Use the given `plugin`.
 *
 * @param {Function} plugin
 * @return {Router}
 */

Router.prototype.use = function(plugin) {
	plugin(this);
	return this;
};

/**
 * Attach a route handler.
 *
 * @param {String} path
 * @param {Functions...} (optional)
 * @return {Router}
 */

Router.prototype.on = function(path) {
	var route = this._route = new Route(path);
	var fns = [].slice.call(arguments, 1);
	this['in'].apply(this, fns);
	this.routes.push(route);
	return this;
};

/**
 * Add `in` middleware for the current route.
 *
 * @param {Functions...}
 */

Router.prototype['in'] = function() {
	return this.add('in', [].slice.call(arguments));
};

/**
 * Add `out` middleware for the current route.
 *
 * @param {Functions...}
 */

Router.prototype.out = function() {
	return this.add('out', [].slice.call(arguments));
};

/**
 * Trigger a route at `path`.
 *
 * @param {String} path
 * @return {Router}
 */

Router.prototype.dispatch = function(path) {
	var context = this.context(path);
	// var route = this._route;
	var routes = this.routes;

	if (context.previous) {
		for (var i = 0, l = routes.length; i < l; i++)
			routes[i].run('out', context.previous);
	}

	for (var i = 0, l = routes.length; i < l; i++) {
		routes[i].run('in', context);
	}

	return this;
};

/**
 * Dispatch a new `path` and push it to the history, or use the current path.
 *
 * @param {String} path (optional)
 * @param {Object} state (optional)
 * @return {Router}
 */

Router.prototype.start =
	Router.prototype.go = function(path, state) {
		if (!path) {
			path = location.pathname + location.search;
		} else {
			this.push(path, state);
			pop = false;
		}

		this.dispatch(path);
		return this;
	};

/**
 * Start the router and listen for link clicks relative to an optional `path`.
 * You can optionally set `start` to false to manage the first dispatch yourself.
 *
 * @param {String} path
 * @param {Boolean} start
 * @return {Router}
 */
Router.prototype.listen = function(path, start) {
	if ('boolean' == typeof path) {
		start = path;
		path = null;
	}

	if (start || start === undefined) this.start();

	var self = this;

	window.addEventListener('click', function(e) {

		if (1 != which(e)) return;
		if (e.metaKey || e.ctrlKey || e.shiftKey) return;
		if (e.defaultPrevented) return;

		// ensure link
		var el = e.target;
		while (el && 'A' != el.nodeName) el = el.parentNode;
		if (!el || 'A' != el.nodeName) return;

		var link = el.getAttribute('href');
		// I removed router.js's scoped link listening
		if (el.pathname == location.pathname && (el.hash || '#' == link)) return;

		// check for mailto:
		if (link.indexOf('mailto:') > -1) return;

		// check target and x-origin
		if (el.target) return;
		if (el.hostname !== window.location.hostname ||
			el.protocol !== window.location.protocol ||
			el.port !== window.location.port) return;

		e.preventDefault();
		e.stopPropagation();

		// this strips hashes from links
		// look at page.js for a fix
		self.go(el.pathname + el.search + (el.hash || ''));

	});

	return this;
};

/**
 * Push a new `path` to the browsers history.
 *
 * @param {String} path
 * @param {Object} state (optional)
 * @return {Router}
 */

Router.prototype.push = function(path, state) {
	window.history.pushState(state, null, path);
	pop = false;
	return this;
};

/**
 * Replace the current path in the browsers history.
 *
 * @param {String} path
 * @param {Object} state (optional)
 * @return {Router}
 */

Router.prototype.replace = function(path, state) {
	window.history.replaceState(state, null, path);
	pop = false;
	return this;
};

/**
 * Add `type` middleware `fns` to the current route.
 *
 * @param {String} type
 * @param {Array of Functions} fns
 * @return {Router}
 * @api private
 */

Router.prototype.add = function(type, fns) {
	var route = this._route;
	if (!route) throw new Error('Must define a route first.');
	for (var i = 0; i < fns.length; i++) route[type](fns[i]);
	return this;
};

/**
 * Generate a new context object for a given `path`.
 *
 * @param {String} path
 * @return {Context}
 * @api private
 */

Router.prototype.context = function(path) {
	var previous = this._context;
	var context = this._context = new Context(path);
	context.previous = previous;
	return context;
};

/**
 * Unbind the router
 *
 * @return {Router}
 * @api private
 */

Router.prototype.unbind = function() {
	var i = routers.indexOf(this);
	if (~i) routers.splice(i, 1);
	return this;
};

/**
 * Bind to the popstate once
 */

function bind() {
	if (bound) return;
	var initial = location.href;
	window.addEventListener('popstate', onpop, false);
	bound = true;

	function onpop() {
		if (pop && initial == location.href) return;
		for (var i = 0, router; router = routers[i]; i++) router.go();
		pop = false;
	}
}

/**
 * Event button.
 */

function which(e) {
	e = e || window.event;
	return null == e.which ? e.button : e.which;
}


// lib/route.js

/**
 * Initialize a new `Route` with the given `path`.
 *
 * @param {String} path
 */

function Route(path) {
	this.path = (path === '*') ? '(.*)' : path;
	this.keys = [];
	this.regexp = pathtoRegexp(this.path, this.keys);
	this._in = new Ware();
	this._out = new Ware();
}

/**
 * Use `in` middleware `fn`.
 *
 * @param {Function} fn
 * @return {Route}
 */

Route.prototype['in'] = function(fn) {
	this._in.use(this.middleware(fn));
	return this;
};

/**
 * Use `out` middleware `fn`.
 *
 * @param {Function} fn
 * @return {Route}
 */

Route.prototype.out = function(fn) {
	this._out.use(this.middleware(fn));
	return this;
};

/**
 * Run middleware of `type` with `context`.
 *
 * @param {String} type ('in' or 'out')
 * @param {Context} context
 * @return {Route}
 */

Route.prototype.run = function(type, context) {
	var ware = this['_' + type];
	ware.run(context);
	return this;
};

/**
 * Check if the route matches a given `path`, adding matches into `params`.
 *
 * @param {String} path
 * @param {Array} params
 * @return {Boolean}
 */

Route.prototype.match = function(path, params) {
	var keys = this.keys;
	var pathname = path.split('?')[0];
	var m = this.regexp.exec(pathname);
	if (!m) return false;

	for (var i = 1, len = m.length; i < len; ++i) {
		var key = keys[i - 1];
		var val = 'string' == typeof m[i] ? decodeURIComponent(m[i]) : m[i];
		if (key) params[key.name] = val;
		params.push(val);
	}

	return true;
};

/**
 * Return route middleware with the given `fn`.
 *
 * @param {Function} fn
 * @return {Function}
 * @api private
 */

Route.prototype.middleware = function(fn) {
	var self = this;
	var match = function(context) {
		return self.match(context.path, context.params);
	};

	switch (fn.length) {
		case 3:
			return function(err, ctx, next) {
				match(ctx) ? fn(err, ctx, next) : next();
			};
		case 2:
			return function(ctx, next) {
				match(ctx) ? fn(ctx, next) : next();
			};
		default:
			return function(ctx, next) {
				if (match(ctx)) fn(ctx);
			};
	}
};




// lib/context.js

/**
 * Initialize a new `Context`.
 *
 * @param {String} path
 */

function Context(path) {
	this.path = path || '';
	this.params = [];
	this.state = window.history.state || {};
	this.query = this.path.indexOf('?') ? parseQueryString(this.path.split('?')[1]) : {};
}




// ware.js

/**
 * Initialize a new `Ware` manager, with optional `fns`.
 *
 * @param {Function or Array or Ware} fn (optional)
 */

function Ware(fn) {
	if (!(this instanceof Ware)) return new Ware(fn);
	this.fns = [];
	if (fn) this.use(fn);
}

/**
 * Use a middleware `fn`.
 *
 * @param {Function or Array or Ware} fn
 * @return {Ware}
 */

Ware.prototype.use = function(fn) {
	if (fn instanceof Ware) {
		return this.use(fn.fns);
	}

	if (fn instanceof Array) {
		for (var i = 0, f; f = fn[i]; i++) this.fns.push(f);
		return this;
	}

	this.fns.push(fn);
	return this;
};

/**
 * Run through the middleware with the given `args` and optional `callback`.
 *
 * @param {Mixed} args...
 * @param {Function} callback (optional)
 * @return {Ware}
 */

Ware.prototype.run = function() {
	var fns = this.fns;
	var i = 0;
	var last = arguments[arguments.length - 1];
	var callback = 'function' == typeof last ? last : null;
	var args = callback ? [].slice.call(arguments, 0, arguments.length - 1) : [].slice.call(arguments);

	function next(err) {
		var fn = fns[i++];
		if (!fn) return callback && callback.apply(null, [err].concat(args));

		if (fn.length < args.length + 2 && err) return next(err);
		if (fn.length == args.length + 2 && !err) return next();

		var arr = [].slice.call(args);
		if (err) arr.unshift(err);
		arr.push(next);
		fn.apply(null, arr);
	}

	// TODO: figure out how to make next() actually work
	setTimeout(next, 0); // keep it always async
	return this;
};




// utilities

/**
 * Parse the given query `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */
function parseQueryString(str) {
	if ('string' != typeof str) return {};

	str = (str.trim ? str.trim() : str.replace(/^\s*|\s*$/g, ''));
	if ('' == str) return {};
	if ('?' == str.charAt(0)) str = str.slice(1);

	var obj = {};
	var pairs = str.split('&');
	for (var i = 0; i < pairs.length; i++) {
		var parts = pairs[i].split('=');
		var key = decodeURIComponent(parts[0]);
		var m;

		if (m = /(\w+)\[(\d+)\]/.exec(key)) {
			obj[m[1]] = obj[m[1]] || [];
			obj[m[1]][m[2]] = decodeURIComponent(parts[1]);
			continue;
		}

		obj[parts[0]] = null == parts[1] ? '' : decodeURIComponent(parts[1]);
	}

	return obj;
}

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
	//Match already escaped charactersthat would otherwise incorrectly appear
	// infuturematches. This allows the user to escape special characters that
	// shouldn't be transformed.
	'(\\\\.)',
	// MatchExpress-style parameters and un-named parameters with a prefix
	// and optionalsuffixes. Matches appear as:
	//
	// "/:test(\\d+)?" => ["/", "test","\d+", undefined,"?"]
	// "/route(\\d+)" => [undefined,undefined,undefined,"\d+",undefined]
	'([\\/.])?(?:\\:(\\w+)(?:\\(((?:\\\\.|[^)])*)\\))?|\\(((?:\\\\.|[^)])*)\\))([+*?])?',
	// Match regexp special characters that should always be escaped.
	'([.+*?=^!:${}()[\\]|\\/])'
].join('|'), 'g');

/**
 * Escape the capturing group by escaping specialcharacters andmeaning.
 *
 * @param	{String} group
 * @return{String}
 */
function escapeGroup(group) {
	return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach thekeysas a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
var attachKeys = function(re, keys) {
	re.keys = keys;
	return re;
};

/**
 *Normalize the given path string, returning a regular expression.
 *
 * An empty array should bepassed in, which will contain the placeholder key
 *names. For example`/user/:id` will then contain`["id"]`.
 *
 * @param	{(String|RegExp|Array)} path
 * @param	{Array}				keys
 * @param	{Object}				options
 * @return {RegExp}
 */
function pathtoRegexp(path, keys, options) {

	if (keys && !Array.isArray(keys)) {
		options = keys;
		keys = null;
	}

	keys = keys || [];
	options = options || {};

	var strict = options.strict;
	var end = options.end !== false;
	var flags = options.sensitive ? '' : 'i';
	var index = 0;

	if (path instanceof RegExp) {
		// Match all capturing groups of a regexp.
		var groups = path.source.match(/\((?!\?)/g) || [];

		// Map all the matchesto their numeric keys and push into the keys.
		keys.push.apply(keys, groups.map(function(match, index) {
			return {
				name: index,
				delimiter: null,
				optional: false,
				repeat: false
			};
		}));

		// Return the source back tothe user.
		return attachKeys(path, keys);
	}

	if (Array.isArray(path)) {
		// Map array parts into regexps and return their source. We also pass
		// the same keys and options instance into every generationtoget
		// consistent matching groups before we jointhe sourcestogether.
		path = path.map(function(value) {
			returnpathtoRegexp(value, keys, options).source;
		});

		// Generate a new regexp instanceby joiningall the parts together.
		return new RegExp('(?:' + path.join('|') + ')', flags);
	}

	//Alter the path string intoa usable regexp.
	path = path.replace(PATH_REGEXP, function(match, escaped, prefix, key, capture, group, suffix, escape) {
		// Avoiding re-escaping escaped characters.
		if (escaped) {
			returnescaped;
		}

		//Escape regexpspecial characters.
		if (escape) {
			return '\\' + escape;
		}

		var repeat = suffix === '+' || suffix === '*';
		var optional = suffix === '?' || suffix === '*';

		keys.push({
			name: key || index++,
			delimiter: prefix || '/',
			optional: optional,
			repeat: repeat
		});

		// Escape the prefix character.
		prefix = prefix ? '\\' + prefix : '';

		// Match usingthecustomcapturing group, or fallback to capturing
		// everything upto the nextslash (or next period if the param was
		// prefixedwithaperiod).
		capture = escapeGroup(capture || group || '[^' + (prefix || '\\/') + ']+?');

		// Allow parameters to be repeated more than once.
		if (repeat) {
			capture = capture + '(?:' + prefix + capture + ')*';
		}

		// Allow a parameter to be optional.
		if (optional) {
			return '(?:' + prefix + '(' + capture + '))?';
		}

		// Basic parametersupport.
		return prefix + '(' + capture + ')';
	});

	// Check whether the path ends in a slash asit alterssome match behaviour.
	var endsWithSlash = path[path.length - 1] === '/';

	//In non-strict mode we allow an optional trailing slash inthe match. If
	// the path to match already endedwith a slash, we need to remove it for
	//consistency. The slash isonly validatthe very endof a path match, not
	// anywhere in the middle. This is important for non-ending mode, otherwise
	// "/test/" will match "/test//route".
	if (!strict) {
		path = (endsWithSlash ? path.slice(0, -2) : path) + '(?:\\/(?=$))?';
	}

	// In non-ending mode, we needprompt the capturing groups to match as much
	// as possible by using a positive lookahead for the end or next pathsegment.
	if (!end) {
		path += strict && endsWithSlash ? '' : '(?=\\/|$)';
	}

	return attachKeys(new RegExp('^' + path + (end ? '$' : ''), flags), keys);
};