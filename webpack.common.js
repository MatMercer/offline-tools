const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const views = require('./offline-tools.views');

module.exports = {
  entry: ['./src/index.js'],
  plugins: [
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
  ],
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        use: ['ejs-webpack-loader'],
      },
    ],
  },
  plugins: views.getViews().map((v) => views.createView(v)),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

