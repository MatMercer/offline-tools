const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const offlineTools = require('./offline-tools.views');

const views = offlineTools.getViews().map((v) => offlineTools.createView(v));

module.exports = {
  entry: ['./src/index.js'],
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {
          helperDirs: path.join(__dirname, './src/views/helpers'), // this config is NEVER passed, there is a bug
          partialDirs: path.join(__dirname, './src/views/partials'),
          knownHelpersOnly: false
        }
      }
    }),
    ...views,
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false})
  ],
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
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

