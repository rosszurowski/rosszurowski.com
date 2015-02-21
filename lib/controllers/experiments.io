exports.callback = function () {
	return function * () {
		console.log(this.url);
		this.body = yield this.render('layout/site');
	}
}