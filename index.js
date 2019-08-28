'use strict';

const isValPromise = require('@fizzygalacticus/is-promise');

module.exports = (fn = () => {}, onData = () => {}, onError = () => {}) => (...params) => {
    try {
        let result = fn(...params);

        const { promise } = isValPromise(result);

        if (promise) {
            return new Promise(async (resolve, reject) => {
                try {
                    result = await result;

                    await onData(result);

                    resolve(result);
                } catch (err) {
                    onError(err);
                    reject(err);
                }
            });
        }

        onData(result);

        return result;
    } catch (err) {
        onError(err);
        throw err;
    }
};
