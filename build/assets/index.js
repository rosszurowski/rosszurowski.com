(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
require('rosszurowski/prototypes:prototypes.js')

document.bind('DOMContentLoaded', function () {
	console.log('hi');
});
}, {"rosszurowski/prototypes:prototypes.js":2}],
2: [function(require, module, exports) {
;(function(exports) {

	/**
	 * Find first child element that matches `selector`
	 * Alias for `querySelector`
	 *
	 * @param	{String}			selector
	 * @return	{HTMLElement}
	 */
	DocumentFragment.prototype.find =
	HTMLDocument.prototype.find =
	HTMLElement.prototype.find = function(selector) {
		return this.querySelector(selector);
	}

	/**
	 * Find all children elements matching `selector`
	 *
	 * @param	{String}			selector
	 * @return	{NodeList}
	 */
	DocumentFragment.prototype.findAll =
	HTMLDocument.prototype.findAll =
	HTMLElement.prototype.findAll = function(selector) {
		return this.querySelectorAll(selector);
	}

	/**
	 * Search parent elements to find one that matches `selector`
	 *
	 * @param	{String}			selector
	 * @return	{HTMLElement|Boolean}
	 */
	DocumentFragment.prototype.findParent =
	HTMLElement.prototype.findParent =
	HTMLDocument.prototype.findParent = function(selector) {
		var el = this.parentNode;
		while (el) {
			if (el.matches && el.matches(selector)) return el;
			el = el.parentNode;
		}
		return false;
	}

	NodeList.prototype.forEach = Array.prototype.slice.call(this).forEach;
	NodeList.prototype.first = function() { return this[0]; }
	NodeList.prototype.last = function() { return this[this.length - 1]; }

	/**
	 * Removes this element or all the nodes in the nodelist
	 *
	 * @return	{HTMLElement|NodeList}
	 */
	var remove = function() {
		// defer to browser standard if it exists
		if (this.parentNode) this.parentNode.removeChild(this);
		else [].forEach.call(this, function(el) { el.remove(); });
		return this;
	}

	// get the prefixed .matches
	HTMLElement.prototype.matches =
		(HTMLElement.prototype.matches ||
		HTMLElement.prototype.webkitMatchesSelector ||
		HTMLElement.prototype.mozMatchesSelector ||
		HTMLElement.prototype.msMatchesSelector ||
		HTMLElement.prototype.oMatchesSelector);

	// if their browser already supports it, don't polyfill	
	HTMLElement.prototype.remove = remove;
	NodeList.prototype.remove = remove;


	/**
	 * Add an event listener
	 *
	 * @param	{String}		type
	 * @param	{Function}	fn
	 * @param	{Boolean}	useCapture (optional)
	 * @return	{HTMLElement|NodeList}
	 */
	Window.prototype.bind = 
	HTMLDocument.prototype.bind =
	HTMLElement.prototype.bind =
	NodeList.prototype.bind = function(type, fn, useCapture) {

		useCapture = useCapture || false;

		// split into whitespace delimited events
		var events = type.match(/\S+/g);

		var self = this;

		if (self.addEventListener) {
			events.forEach(function(evt) {
				self.addEventListener(evt, fn, useCapture);
			});
		} else {
			[].forEach.call(self, function(el) {
				events.forEach(function(evt) {
					el.addEventListener(evt, fn, useCapture);
				});
			});
		}

		return this;

	}

	/**
	 * Remove an event listener
	 *
	 * @param	{String}		type
	 * @param	{Function}	fn
	 * @param	{Boolean}	useCapture (optional)
	 * @return	{HTMLElement|NodeList}
	 */
	HTMLElement.prototype.unbind =
	NodeList.prototype.unbind = function(type, fn, useCapture) {

		useCapture = useCapture || false;

		// split into whitespace delimited events
		var events = type.match(/\S+/g);
		var self = this;

		if (self.removeEventListener) {
			events.forEach(function(evt) {
				self.removeEventListener(evt, fn, useCapture);
			});
		} else {
			[].forEach.call(self, function(el) {
				events.forEach(function(evt) {
					el.removeEventListener(evt, fn, useCapture);
				});
			});
		}

		return this;

	}

	/**
	 * Bind an event listener that will only be called once.
	 *
	 * @param	{String}		type
	 * @param	{Function}	fn
	 * @param	{Boolean}	useCapture (optional)
	 * @return	{HTMLElement|NodeList}
	 */
	HTMLElement.prototype.once =
	NodeList.prototype.once = function(type, fn, useCapture) {

		useCapture = useCapture || false;
		var self = this;

		self.bind(type, function() {
			fn.apply(this, arguments);
			self.unbind(type, arguments.callee, useCapture);
		}, useCapture);

		return self;

	}

	/**
	 * Delegates all events from selector to the given element.
	 *
	 * @param {String}    event
	 * @param {String}    selector
	 * @param {Function}  fn
	 * @param {Boolean}   useCapture
	 * @returns {Boolean}
	 */
	Window.prototype.delegate = 
	HTMLDocument.prototype.delegate =
	HTMLElement.prototype.delegate = function(event, selector, fn, useCapture) {

		useCapture = useCapture || false;

		this.bind(event, function(e) {

			var el = e.target || e.srcElement;

			while(el && el.matches && !el.matches(selector)) el = el.parentNode;
			if (!el || (el.matches && !el.matches(selector)) || el === document) return;

			fn.call(el, e);

		}, useCapture);

		return this;

	}

	NodeList.prototype.toArray =
	HTMLCollection.prototype.toArray = function() {
		return Array.prototype.slice.call(this);
	}

	// Helper functions


})(window);
}, {}]}, {}, {"1":""})
