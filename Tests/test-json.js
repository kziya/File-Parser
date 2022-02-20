'use strict';
const FileParser = require('../file-parser');
const test = require('./test');
const parser = new FileParser();
const expected1 = [
  {
    name: 'Alex',
    age: 28,
  },
  {
    name: 'Mark',
    age: 22,
  },
];
const result1 = parser.parseJson('./json/test-1.json');
const testRes1 = test(result1, expected1);
console.log(result1);
if (testRes1) console.log('Json test 1 passed!');
else console.log('json test 1 not passed!');
