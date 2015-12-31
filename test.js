import test from 'ava';
import fn from './';

test.cb(t => {
	fn({
		text: 'text',
		title: 'title',
		icon: 'shell32.dll,-154'
	}, () => {
		t.pass();
		t.end();
	});
});
