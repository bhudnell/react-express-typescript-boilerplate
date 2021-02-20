const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
	template: './src/index.html',
});

const cleanWebpackPlugin = new CleanWebpackPlugin();

const extractCssChunksPlugin = new ExtractCssChunksPlugin({
	filename: '[name].css',
	chunkFilename: '[id].css',
});

module.exports = {
	mode: 'development',
	entry: './src/main.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js',
		publicPath: '/',
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.ts', '.tsx', '.js'],
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, 'build'),
		historyApiFallback: true,
		hot: true,
		open: true,
		overlay: true,
		port: 3000,
		quiet: true,
		proxy: {
			'/api': 'http://localhost:5000',
		},
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
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: ExtractCssChunksPlugin.loader,
						options: {
							hmr: true,
						},
					},
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},
	plugins: [cleanWebpackPlugin, htmlPlugin, extractCssChunksPlugin],
};
