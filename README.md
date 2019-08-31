# promise-or-not

`promise-or-not` is a function decorator that can act as a middleman to perform operations on resulting data, even if the function initially returns a promise.

## Installation

`yarn add @fizzygalacticus/promise-or-not` || `npm i --save @fizzygalacticus/promise-or-not`

## Usage

**Parameters:**
* `fn` - The primary function you wish to run
* `onData` - The function to call when data is received
* `onError` - The function to call when an error occurrs
* `returnPromise` - Forces even synchronous functions to return a `Promise`. This can be useful in situations where you may want to make multiple calls to `promise-or-not` as I do in my [savethis](https://github.com/FizzyGalacticus/savethis) project.

For synchronous functions:
```js

const promiseOrNot = require('@fizzygalacticus/promise-or-not');

const mySyncFn = i => 'some return value ' + i;

const decorated = promiseOrNot(mySyncFn, val => console.log(val));

const val = decorated(1); // will print `1`
console.log(val) // `1`

```

For asynchronous functions:
```js

const promiseOrNot = require('@fizzygalacticus/promise-or-not');

const mySyncFn = i => Promise.resolve('some return value ' + i);

const decorated = promiseOrNot(mySyncFn, val => console.log(val));

decorated(1).then(console.log); // will print `1` twice

```

## Why?

This was initially written for my [trythis](https://github.com/FizzyGalacticus/trythis) library, which just prints the return value of a wrapped function (such as the example above). I then realized that this would be very handy to abstract away for other, potentially similar use cases.
