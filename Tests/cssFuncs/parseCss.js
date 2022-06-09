'use strict';
const { myParser, assert } = require('../tools');
const expected = {
    body: {
        margin: '10px',
    },
};
const cssString = 'body{margin:10px;}';
const actual = myParser.parseCss(cssString, true);
assert.deepStrictEqual(actual, expected);
console.log('parseCss test passed!');
