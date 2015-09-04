"use strict";

var path = require( "path" );
var webpack = require( "webpack" );
var entries = {
	"bypass": ["./src/index.js"]
};
var isEnvironmentDevServer = "dev-server" === process.env.NODE_ENV;
var plugins = [

	// We don't need ALL of moment's locales
	new webpack.IgnorePlugin(
		/^\.\/locale$/, /moment$/
	)
];
var outputPath = __dirname + "/build";
var publicPath = "";
var nonNodeModulesJSLoaders = ["babel-loader?stage=0"];

if ( "production" === process.env.NODE_ENV ) {
	plugins = plugins.concat([
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			compressor: {
				warnings: false
			}
		}),

		new webpack.optimize.OccurenceOrderPlugin( true )
	]);
}
else if ( isEnvironmentDevServer ) {
	plugins = plugins.concat([
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]);
	var pathString = "http://localhost:" + process.env.DEV_PORT + "/";
	var devServerEntries = [
		"webpack-dev-server/client?" + pathString,
		"webpack/hot/only-dev-server"
	];
	for( var key in entries ){
		entries[ key ].unshift.apply( entries[ key ], devServerEntries );
	}
	publicPath = pathString;
	nonNodeModulesJSLoaders.unshift( "react-hot" );
}

module.exports = {
	entry: entries,
	output: {
		path: outputPath,
		filename: "[name].bundle.js",
		publicPath: publicPath
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "envify-loader"
			},
			{
				test: /\.js$/,
				loaders: nonNodeModulesJSLoaders,
				exclude: /node_modules/
			}
		]
	},
	plugins: plugins
};
