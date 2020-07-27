'use strict';

const isValPromise = require('@fizzygalacticus/is-promise');

module.exports = (
    fn = () => {},
    { context = {}, onData = () => {}, onError = () => {}, returnPromise = false } = {}
) => (...params) => {
    try {
        let result = fn.call(context, ...params);

        const { promise } = isValPromise(result);

        if (promise || returnPromise) {
            return new Promise(async (resolve, reject) => {
                try {
                    result = await result;
                    await onData(result, true);
                    resolve(result);
                } catch (err) {
                    onError(err);
                    reject(err);
                }
            });
        }

        onData(result, false);

        return result;
    } catch (err) {
        onError(err);
        throw err;
    }
};
