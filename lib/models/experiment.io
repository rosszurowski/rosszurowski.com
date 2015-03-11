"use strict";

/**
 * A sub-set of page specifically geared towards experiments
 */

var fs = require('mz/fs');
var join = require('path').join;
var merge = require('merge');
var yaml = require('yamljs');

class Experiment {
	
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
		if (!this.manifest) return;
		this.data = yaml.parse(yield fs.readFile(join(this.root, this.slug, this.manifest), 'utf8'));
	}
	
	get locals() {
		let injected = {
			slug: this.slug,
			url: this.url,
			frame: `${this.root.replace(__content, '')}/${this.slug}/frame`
		}
		return merge(this.data, injected);
	}
	
	get url() {
		return `${this.root.replace(__content, '')}/${this.slug}`
	}
	
}

module.exports = Experiment;