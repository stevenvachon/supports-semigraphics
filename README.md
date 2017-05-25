# supports-semigraphics [![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

> Determine if your terminal supports text animations.

Some environments try to simulate a TTY which can bugger up logs with your [semigraphic animations](https://en.wikipedia.org/wiki/Semigraphics).


## Installation

[Node.js](http://nodejs.org/) `>= 4` is required. To install, type this at the command line:
```shell
npm install supports-semigraphics
```


## Usage

```js
const supportsSemigraphics = require('supports-semigraphics');

if (supportsSemigraphics()) {
	// the terminal probably has support for semigraphics
}
```

You can also check a specific stream:
```js
supportsSemigraphics(fs.createWriteStream('./output.log'));
//-> false
```


## Info

It obeys the `--animation` and `--no-animation` CLI flags.

For situations where using `--animation` is not possible, add an environment variable `FORCE_ANIMATION` with any value to force animations. Trumps `--no-animation`.


[npm-image]: https://img.shields.io/npm/v/supports-semigraphics.svg
[npm-url]: https://npmjs.org/package/supports-semigraphics
[travis-image]: https://img.shields.io/travis/stevenvachon/supports-semigraphics.svg
[travis-url]: https://travis-ci.org/stevenvachon/supports-semigraphics
