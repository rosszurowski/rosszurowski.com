"use strict";

/**
 * A class to model page-related data
 */

var fs = require('mz/fs');
var join = require('path').join;
var merge = require('merge');
var yaml = require('yamljs');

class Page {
	
	constructor(root, slug) {
		if (!root) throw new Error('Must pass `root` to new page');
		if (!slug) throw new Error('Must pass `slug` to new page');
		
		this.root = root;
		this.slug = slug;
		
	}
	
	/**
	 * Read page metadata into object
	 * @returns {void}
	 */
	*read() {
		
		this.files = yield fs.readdir(join(this.root, this.slug));
		this.files = this.files.filter((path) => !path.startsWith('.')); // no hidden files
		
		this.manifest = this.files.filter(path => path.endsWith('yml')).shift();
		this.template = this.manifest.split('.').shift();
		this.data = yaml.parse(yield fs.readFile(join(this.root, this.slug, this.manifest), 'utf8'));

	}
	
	/**
	 * Renders page template and output
	 * @param {Context} ctx
	 * @returns {Response}
	 */
	*render(ctx) {
		
		switch (this.template) {
			case 'redirect':
				if (!this.data.destination)
					throw new Error('Redirect yml file does not specify a destination');
				ctx.status = this.data.status || 302;
				ctx.redirect(this.data.destination);
				return;
				break;
		}
		
		ctx.body = yield ctx.render(this.template);

	}
	
	/**
	 * Getter for page locals
	 * @returns {Boolean}
	 */
	get locals() {
		let injected = {
			slug: this.slug,
			url: this.url,
			template: this.template
		}
		return merge(this.data, injected);
	}
	
	get url() {
		return `/${this.slug}/`;
	}
}

module.exports = Page;