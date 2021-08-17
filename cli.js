#!/usr/bin/env node
import process from 'node:process';
import meow from 'meow';
import getStdin from 'get-stdin';
import trayballoon from './index.js';

const cli = meow(`
	Usage
	  trayballoon <text>
	  echo <text> | trayballoon

	Example
	  trayballoon unicorns --title rainbows --icon ponies.ico

	Options
	  --title    Title of the balloon
	  --icon     Path to a .ico file or .exe/.dll file with icon resource index
	  --timeout  Time to show the balloon in milliseconds
	  --wait     Wait for the balloon to disappear
`);

async function init(data) {
	if (!data) {
		console.error('Input required');
		process.exit(1);
	}

	cli.flags.text = data;

	if (cli.flags.wait) {
		await trayballoon(cli.flags);
	} else {
		trayballoon(cli.flags);
	}
}

(async () => {
	if (process.stdin.isTTY) {
		await init(cli.input[0]);
	} else {
		const stdin = await getStdin();
		await init(stdin);
	}
})();
