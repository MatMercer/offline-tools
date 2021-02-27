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
    offlineTools: './src/lib/entrypoint.js', // main chunk for the website, handle scripts used by all views
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
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
    filename: 'js/[name].[contenthash].js',
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
  resolve: {
    alias: {
      "vue": "vue/dist/vue.esm-bundler.js"
    }
  }
};

