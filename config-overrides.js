/* eslint-disable no-param-reassign */

const rewireSass = require('react-app-rewire-scss');
const rewireSvgReactLoader = require('react-app-rewire-svg-react-loader');

module.exports = function override(config, env) {
	config = rewireSass(config, env);
	config = rewireSvgReactLoader(config, env);
	return config;
};
