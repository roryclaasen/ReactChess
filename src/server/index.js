/* eslint no-console: 0 */

const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..', '..');

if (!fs.existsSync(path.join(root, 'build'))) {
	console.error('No build files found, run \'npm build:js\' first');
	process.exit(1);
}

require('@babel/register');

module.exports = require('./app.js');
