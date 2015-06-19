#!/usr/bin/env node
'use strict';
var meow = require('meow');
var stdin = require('get-stdin');
var trayballoon = require('./');

var cli = meow({
	help: [
		'Usage',
		'  trayballoon <text>',
		'  echo <text> | trayballoon',
		'',
		'Example',
		'  trayballoon unicorns --title rainbows --icon ponies.ico',
		'',
		'Options',
		'  --title    Title of the balloon',
		'  --icon     Path to a .ico file or .exe/.dll file with icon resource index',
		'  --timeout  Time to show the balloon in milliseconds',
		'  --wait     Wait for the balloon to disappear'
	]
});

function init(data) {
	if (!data) {
		console.error('Input required');
		process.exit(1);
	}

	cli.flags.text = data;

	trayballoon(cli.flags, function (err) {
		if (err) {
			console.error(err);
			process.exit(1);
		}
	});
}

if (process.stdin.isTTY) {
	init(cli.input[0]);
} else {
	stdin(init);
}
