const merge = require('merge');
const baseConfig = require('../../../jest.config.base');

const mergeData = merge.recursive(
  baseConfig,
  {
    testEnvironment: 'jsdom',
    transform: {
      '\\.(js|jsx)?$': '../../../transform.js',
    },
    moduleNameMapper: {
      '^__mocks__/(.*)$': '<rootDir>/../../__mocks__/$1',
      // we'll use commonjs version of lodash for tests 👌
      // because we don't need to use any kind of tree shaking right?!
      '^lodash-es$': '<rootDir>/../../../node_modules/lodash/index.js',
    },
    roots: ['src'],
  },
  {
    globals: {},
  },
);

module.exports = mergeData;
