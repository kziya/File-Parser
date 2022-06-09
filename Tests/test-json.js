'use strict';
const fs = require('fs');
const path = require('path');
const FileParser = require('../file-parser');
const assert = require('node:assert');
const parser = new FileParser(fs, path);
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
const actual = parser.parseJsonFile('./json/test-1.json');
assert.deepStrictEqual(actual, expected);
console.log('Css Test Passed !');
