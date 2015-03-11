"use strict";

var parent, navigation, frame;
var experiments = [];
var index = 0;

/**
* Route to match
*/
exports.route = '/experiments/:slug?';

/**
 * Entry function
 */
exports.in = function () {
	parent = document.find('main');
	navigation = parent.find('nav');
	experiments = navigation.map(parse);
	go(index);
}

/**
 * Exit function
 */
exports.out = function () {
}

function go(i) {
	if (!experiments.length) return;
	i = Math.max(i, 0);
	i = i % experiments.length;
	if (!frame) {
		frame = construct(experiments[i]);
		parent.appendChild(frame);
	}
	var prev = frame;
	prev.classList.add('inactive');
	frame = construct(experiments[i]);
	parent.appendChild(frame);
}

function parse(el) {
	return el.dataset.url;
}

function construct(src) {
	frame = document.createElement('iframe');
	frame.src = src;
	frame.classList.add('loading');
	return frame;
}