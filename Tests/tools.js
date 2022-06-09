'use strict';
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const FileParser = require('../file-parser');
const myParser = new FileParser(fs, path);
module.exports = { myParser, assert, fs };
