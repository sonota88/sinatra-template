module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    "page_index": "./js/page_index.js",
    // "common": "./js/common.js"
  },
  output: {
    path: __dirname + "/public/js/webpack",
    filename: "[name].js"
  }
};
