module.exports = {
	entry:{
		js : "./src/app2.js",
		css: "./css/style.css",
		
	},

	output: {
/*		path: 'build',*/

		filename:'bundle.js'

	},

	module: {
		loaders:[
			{
 			 test: /\.(ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
 			
			  loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]'

			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(scss|css)$/,
				loader:"style-loader!css-loader!sass-loader"
			},

		]

	}


};