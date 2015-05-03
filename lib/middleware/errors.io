"use strict";

/**
 * Error handling middleware, all lumped together
 */

var http = require('http');
var compose = require('koa-compose');

module.exports = function (opts) {	
	return compose([error, missing]);
}

/**
 * Throw a 404 error
 */
function * missing (next) {
	yield next;
	if (this.response.body) return;
	if (this.response.status !== 404) return;
	this.throw(404);
}

/**
 * Handle all errors
 */
function * error (next) {
	let env = process.env.NODE_ENV || 'development';
	try { 
		yield next; 
	} catch(err) {
		this.status = err.status || 500;
		this.app.emit('error', err, this);
		switch (this.accepts('html', 'text', 'json')) {
			case 'text':
				if ('development' === env) this.body = err.message;
				else throw err;
				break;
			case 'json':
				if ('development' === env) this.body = { error: err.message };
				else this.body = { error: http.STATUS_CODES[this.status] }
				break;
			case 'html':
				this.body = yield this.render('error', {
					env: env,
					ctx: this,
					request: this.request,
					response: this.response,
					error: {
						message: err.message,
						stack: err.stack,
						status: this.status,
						code: err.code
					}
				});
				break;
		}
	}
}