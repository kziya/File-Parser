'use strict';
const test = (result, expected) => {
  const resType = typeof result;
  if (resType === typeof expected) {
    if (resType === 'object')
      return JSON.stringify(result) === JSON.stringify(expected);
    return result.toString() === expected.toString();
  }
  return false;
};

module.exports = test;
