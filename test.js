'use strict';
var test = require('ava');
var trayballoon = require('./');

test(function (t) {
	trayballoon({
		text: 'text',
		title: 'title',
		icon: 'shell32.dll,-154'
	}, function () {
		t.assert(true);
		t.end();
	});
});
