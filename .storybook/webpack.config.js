module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve("ts-loader"),
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
