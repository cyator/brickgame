const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: path.resolve(__dirname, 'src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		assetModuleFilename: 'images/[hash][ext][query]',
		clean: true,
	},
	devtool: 'inline-source-map',
	devServer: {
		static: { directory: path.resolve(__dirname, 'dist') },
		port: 3000,
		// open: true,
		hot: true,
	},
	//loaders
	module: {
		rules: [
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
			{ test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, type: 'asset/resource' },
			{
				test: /\.html$/,
				use: ['html-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
	//plugins
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'template.html'),
		}),
	],
};
