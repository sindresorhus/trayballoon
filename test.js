import process from 'node:process';
import test from 'ava';
import trayballoon from './index.js';

test('main', async t => {
	if (process.env.CI) {
		t.pass();
		return;
	}

	await t.notThrowsAsync(
		trayballoon({
			text: 'text',
			title: 'title',
			icon: 'shell32.dll,-154',
		}),
	);
});
