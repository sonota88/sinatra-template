module.exports = {
  entry: {
    "page_index": "./js/page_index.js",
    "common": "./js/common.js"
  },
  output: {
    path: __dirname + "/public/js",
    filename: "[name].js"
  }
};
