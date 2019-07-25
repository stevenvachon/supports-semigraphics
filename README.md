# supports-semigraphics [![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Monitor][greenkeeper-image]][greenkeeper-url]

> Determine if a terminal/stream supports text animations.

Some environments try to simulate a TTY which can bugger up logs with your progress bar, character spinner, etc [semigraphic animations](https://en.wikipedia.org/wiki/Semigraphics).


## Installation

[Node.js](http://nodejs.org) `>= 4` is required. To install, type this at the command line:
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


## Forcing Support

The use of `--animation` or `--no-animation` CLI flags in any command will be obeyed. Additionally, so will the environment variable `FORCE_ANIMATION`.


[npm-image]: https://img.shields.io/npm/v/supports-semigraphics.svg
[npm-url]: https://npmjs.com/package/supports-semigraphics
[travis-image]: https://img.shields.io/travis/stevenvachon/supports-semigraphics.svg
[travis-url]: https://travis-ci.org/stevenvachon/supports-semigraphics
[greenkeeper-image]: https://badges.greenkeeper.io/stevenvachon/supports-semigraphics.svg
[greenkeeper-url]: https://greenkeeper.io/
