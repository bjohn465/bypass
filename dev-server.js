var webpack = require( "webpack" );
var WebpackDevServer = require( "webpack-dev-server" );
var config = require( "./webpack.config" );

new WebpackDevServer(
	webpack( config ),
	{
		hot: true,
		historyApiFallback: true
	}
).listen(
	process.env.DEV_PORT,
	"localhost",
	function ( err, result ) {
		if ( err ) {
			console.log( err );
		}

	console.log( "Listening on port " + process.env.DEV_PORT );
});
