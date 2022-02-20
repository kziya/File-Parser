'use strict';
const FileParser = require('../file-parser');
const test = require('./test');
const parser = new FileParser();
const expected1 = {
  '*': {
    margin: '10px',
    background: 'red',
  },
};
const result1 = parser.parseCss('./css/test-1.css');
const testRes1 = test(result1, expected1);
console.log(result1,expected1);
if (testRes1) console.log('Css Test 1 passed!');
else console.log('Css Test 1 not passed!');
