# trayballoon

> Create a trayballoon on Windows

![](screenshot.gif)


## Install

```sh
$ npm install --save trayballoon
```


## Usage

```js
var trayballoon = require('trayballoon');

trayballoon({
	text: 'Unicorns & rainbows',
	icon: 'ponies.ico',
	timeout: 20000
}, function () {
	console.log('Trayballoon disappeared');
});
```


## API

### trayballoon(options, [callback])

#### options

##### text

*Required*  
Type: `string`

The body text.

##### title

Type: `string`

The title text.

##### icon

Type: `string`

Path to a `.ico` file or a `.exe`/`.dll` file with icon resource index *(eg: shell32.dll,-154)*.

##### timeout

Type: `number`  
Default: `5000`

Time to show the balloon in milliseconds.

##### wait

Type: `boolean`  
Default: `false`

Wait until the balloon disappear for the callback to be called.

Only has an effect if you supply a callback.


## CLI

```sh
$ npm install --global trayballoon
```

```
$ trayballoon --help

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
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
