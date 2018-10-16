const rewireSass = require('react-app-rewire-scss');

/* eslint-disable no-param-reassign */
module.exports = function override(config, env) {
	config = rewireSass(config, env);
	return config;
};
