'use strict';
const { myParser, assert } = require('../tools');
const expected = {
    '*': {
        margin: '10px',
        background: 'red',
    },
};
const actual = myParser.parseCssFile('./css/test-1.css');
assert.deepStrictEqual(actual, expected);
console.log('parseCss test passed !');
