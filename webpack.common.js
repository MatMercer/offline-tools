const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
    ...viewsForEachLang,
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  output: {
    filename: 'js/[name].[contenthash].js',
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

