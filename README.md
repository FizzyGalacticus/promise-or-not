# promise-or-not

`promise-or-not` is a function decorator that can act as a middlemad to perform operations on resulting data, even if the function initially returns a promise.

## Installation

`yarn add @fizzygalacticus/promise-or-not` || `npm i --save @fizzygalacticus/promise-or-not`

## Usage

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
