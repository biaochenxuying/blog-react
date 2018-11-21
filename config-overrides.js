const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
	config = injectBabelPlugin(
		['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], // change importing css to less
		config,
	);
	config.devtool = false;
	config = injectBabelPlugin('babel-plugin-transform-decorators-legacy', config); // 支持装饰器
	config = rewireLess.withLoaderOptions({
		modifyVars: { '@primary-color': '#1890ff' },
		javascriptEnabled: true,
	})(config, env);
	return config;
};
