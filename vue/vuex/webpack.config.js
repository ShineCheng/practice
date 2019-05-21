// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');
module.exports = {
    entry: './app.js',
    output: {
        filename: 'public/bundle.js',
        path: path.resolve(__dirname, './'),
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
};