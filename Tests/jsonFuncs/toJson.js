'use strict';
const { myParser, assert } = require('../tools');
const expected = '{"name":"Mark"}';
const exampleData = {
    name: 'Mark',
};
const actual = myParser.toJson(exampleData, true);
assert.strictEqual(actual, expected);
console.log('toJson test passed!');
