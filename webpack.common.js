const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const offlineTools = require('./offline-tools.views');

const views = offlineTools.getViews();
const viewsForEachLang = offlineTools
  .getViewsForEachLanguage(views)
  .map((v) => offlineTools.createView(v));

module.exports = {
  entry: offlineTools.getViewEntries({
    offlineTools: './src/lib/offline-tools.js',
  }, views),
  plugins: [
    ...viewsForEachLang,
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

