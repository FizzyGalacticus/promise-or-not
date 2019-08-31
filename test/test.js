'use strict';

const assert = require('assert');

const isPromise = require('@fizzygalacticus/is-promise');

const promiseOrNot = require('../');

describe('promise-or-not', () => {
    describe('synchronous', () => {
        it('should return the same value as the normal function', () => {
            const value = 'this is a test';
            const fn = () => value;

            const result = promiseOrNot(fn)();

            assert.equal(value, result);
        });
        it('should inform onData function that regular function did not return promise', () => {
            const fn = () => null;

            return promiseOrNot(fn, (val, wasPromise) => {
                assert.equal(wasPromise, false);
            })();
        });

        it('should process data in order', () => {
            let test = 'foo';
            const fn = () => {
                test = 'bar';
            };

            const modify = () => {
                test = 'fizz';
            };

            promiseOrNot(fn, modify)();

            assert.equal(test, 'fizz');
        });

        it('should forceable to return a Promise', () => {
            const value = 'this is a test';
            const fn = () => value;

            const result = promiseOrNot(fn, undefined, undefined, true)();

            assert.ok(isPromise(result).promise);
            assert.ok(!isPromise(value).promise);
        });

        it('should throw if the normal function threw', () => {
            const fn = () => {
                throw new Error('bla');
            };

            assert.throws(promiseOrNot(fn));
        });
    });

    describe('asynchronous', () => {
        it('should resolve to the same value as the normal function', async () => {
            const value = 'this is a test';
            const fn = () => Promise.resolve(value);

            const result = await promiseOrNot(fn)();

            assert.equal(value, result);
        });

        it('should inform onData function that regular function did return promise', () => {
            const fn = () => Promise.resolve();

            return promiseOrNot(fn, (val, wasPromise) => {
                assert.equal(wasPromise, true);
            })();
        });

        it('should process data in order', async () => {
            let test = 'foo';
            const fn = () =>
                new Promise(resolve => {
                    test = 'bar';
                    resolve();
                });

            const modify = () => {
                test = 'fizz';
            };

            await promiseOrNot(fn, modify)();

            assert.equal(test, 'fizz');
        });

        it('should reject if the normal function rejects', () => {
            const fn = () => Promise.reject('bla');

            assert.rejects(promiseOrNot(fn));
        });
    });
});
