'use strict';
const { myParser, fs } = require('../tools');
const exampleCssData = {
    body: {
        'font-size': '18px',
    },
};
const exampleCssFileUrl = './css/example.css';
myParser.makeCssFile(exampleCssData, exampleCssFileUrl);

const res = fs.existsSync('Tests/css/example.css');
if (res)
    fs.unlink('Tests/css/example.css', () =>
        console.log('makeCssFile test passed!')
    );
else throw new Error('makeCssFile test not passed !');
