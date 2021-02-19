const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const offlineTools = require('./offline-tools.views');

const views = offlineTools.getViews().map((v) => offlineTools.createView(v));

module.exports = {
  entry: {
    offlineTools: './src/index.js',
    'hello-physics': './src/views/physics/index.js'
  },
  plugins: [
    ...views,
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false})
  ],
  module: {
    rules: [
      {
        test: /\.ejs$/i,
        use: ['ejs-webpack-loader'],
      },
      {
        test: /\.json$/i,
        use: ['json-loader']
      }
    ],
  },
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

