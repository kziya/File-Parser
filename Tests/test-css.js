'use strict';
const fs = require('fs');
const path = require('path');
const FileParser = require('../file-parser');
const assert = require('node:assert');
const myParser = new FileParser(fs, path);
const expected = {
    '*': {
        margin: '10px',
        background: 'red',
    },
};
const actual = myParser.parseCssFile('./css/test-1.css');
assert.deepStrictEqual(actual, expected);
console.log('Json test passed !');
