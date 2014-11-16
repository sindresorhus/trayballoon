'use strict';
var path = require('path');
var spawn = require('child_process').spawn;
var onetime = require('onetime');

module.exports = function (opts, cb) {
	if (typeof opts !== 'object') {
		cb = opts;
		opts = {};
	}

	var reIsBinResource = /^[^\.]+\.(?:exe|dll),-\d+$/;

	// only wait when there's a callback
	opts.wait = !!cb && opts.wait === true || false;

	opts.icon = opts.icon || '';
	opts.icon = reIsBinResource.test(opts.icon) ? opts.icon : path.resolve(opts.icon);

	cb = cb || function () {};
	cb = onetime(cb);

	if (process.platform !== 'win32') {
		throw new Error('Only works on Windows');
	}

	if (!opts.text) {
		throw new Error('`text` option is required');
	}

	var args = [
		'trayballoon',
		opts.title  || ' ',
		opts.text,
		opts.icon || ' ',
		typeof opts.timeout === 'number' ? opts.timeout : '5000'
	];

	var cpOpts = {
		cwd: path.join(__dirname, 'vendor')
	};

	if (!opts.wait) {
		cpOpts.detached = true;
		cpOpts.stdio = ['ignore', 'ignore', process.stderr];
	}

	var cp = spawn('./nircmdc.exe', args, cpOpts);

	if (!opts.wait) {
		cp.unref();
	}

	cp.once('error', cb);

	cp.once('close', function (code) {
		// NirCmd exits with this weird code even though it worked
		cb(code === 4207175 ? 0 : code);
	});

	// make sure the callback is called, after a possible `exit` event,
	// since unref()'ing the process makes it not call the `close` event
	setImmediate(cb);
};
