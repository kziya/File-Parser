'use strict';
const { myParser, fs } = require('../tools');
const exampleJsonData = {
    name: 'Mark',
};
const exampleJsonFileUrl = './json/example.json';
myParser.makeJsonFile(exampleJsonData, exampleJsonFileUrl);

const res = fs.existsSync('Tests/json/example.json');
if (res)
    fs.unlink('Tests/json/example.json', () =>
        console.log('makeJsonFile test passed!')
    );
else throw new Error('makeJsonFile test not passed !');
