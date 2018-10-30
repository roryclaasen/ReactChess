/* eslint-disable no-param-reassign */

const rewireSass = require('react-app-rewire-scss');
const rewireTypescript = require('react-app-rewire-typescript');

module.exports = function override(config, env) {
	config = rewireSass(config, env);
	config = rewireTypescript(config, env);
	return config;
};
