var webpack = require('webpack');

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    "page_index": "./ts/page_index.ts",
    // "common": "./js/common.js"
  },
  output: {
    path: __dirname + "/public/js/webpack",
    filename: "[name].js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  resolve: {
    extensions: [".ts"]
  }
};
