'use strict';
const { myParser, assert } = require('../tools');
const expected = true;
const cssString = '*{margin:10px;}';
const actual = myParser.checkCssSyntax(cssString);
assert.strictEqual(actual, expected);
console.log('CheckCssSyntax Test Passed !');
