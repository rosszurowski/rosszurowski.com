exports.callback = function () {
	return function * () {
		console.log(this.url);
		this.body = 'Still to be done';
	}
}