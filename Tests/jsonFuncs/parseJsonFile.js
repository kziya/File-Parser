'use strict';
const { myParser, assert } = require('../tools');
const expected = [
    {
        name: 'Alex',
        age: 28,
    },
    {
        name: 'Mark',
        age: 22,
    },
];
const actual = myParser.parseJsonFile('./json/test-1.json');
assert.deepStrictEqual(actual, expected);
console.log('parseJsonFile test passed!');
