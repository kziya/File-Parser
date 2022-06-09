'use strict';
const { myParser, assert } = require('../tools');
const expected = true;
const exampleJsonString = '{"name" : "Mark" }';
const actual = myParser.checkJsonSyntax(exampleJsonString);
assert.strictEqual(actual, expected);
console.log('checkJsonSyntax test passed!');
