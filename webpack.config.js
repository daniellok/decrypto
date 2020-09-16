const path = require("path");

module.exports = {
  mode: "development",
  entry: [path.resolve(__dirname, "src/client/")],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
