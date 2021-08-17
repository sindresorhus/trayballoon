import process from 'node:process';
import path from 'node:path';
import nircmd from 'nircmd';

export default async function trayballoon(options = {}) {
	if (process.platform !== 'win32') {
		throw new Error('Only works on Windows');
	}

	if (!options.text) {
		throw new Error('The `text` option is required');
	}

	const reIsBinResource = /^[^.]+\.(?:exe|dll),-\d+$/;

	options.icon = options.icon || '';
	options.icon = reIsBinResource.test(options.icon) ? options.icon : path.resolve(options.icon);
	options.timeout = typeof options.timeout === 'number' ? options.timeout : 5000;

	await nircmd([
		'trayballoon',
		options.title || ' ',
		options.text,
		options.icon || ' ',
		options.timeout,
	]);
}
