const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  resolve: {
    alias: {
      'vue/dist/vue': 'vue/dist/vue.min.js' // use min version instead of debug version
    }
  }
});
