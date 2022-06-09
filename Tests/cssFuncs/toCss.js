'use strict';
const { myParser, assert } = require('../tools');
const expected = 'body{margin:10px;}';
const exapmleObj = {
    body: {
        margin: '10px',
    },
};
const actual = myParser.toCss(exapmleObj, true);
assert.strictEqual(actual, expected);
console.log('toCss test passed !');
