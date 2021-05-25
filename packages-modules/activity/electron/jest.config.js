const base = require('../../../jest.config.base');
const packageJson = require('./package');

module.exports = {
    ...base,
    name: packageJson.name,
    displayName: packageJson.name,
    transform: {
        // Use our custom transformer only for the *.js and *.jsx files
        '\\.(js|jsx)?$': '../../../transform.js',
    },
    roots: ['src'],
};
