const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
	template: './index.html',
	filename: './index.html',
});

const cleanWebpackPlugin = new CleanWebpackPlugin();

const extractCssChunksPlugin = new ExtractCssChunksPlugin({
	filename: '[name].[hash].css',
	chunkFilename: '[id].[hash].css',
});

module.exports = {
	mode: 'production',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].[contenthash].bundle.js',
		chunkFilename: '[name].[contenthash].chunk.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	optimization: {
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: ExtractCssChunksPlugin.loader,
						options: {
							hmr: true,
						},
					},
					{
						loader: 'css-loader',
					},
				],
			},
		],
	},
	plugins: [cleanWebpackPlugin, htmlPlugin, extractCssChunksPlugin],
};
