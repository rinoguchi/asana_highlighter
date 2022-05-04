const ejs = require("ejs");
const CopyPlugin = require("copy-webpack-plugin");

function transformFile(content) {
  return ejs.render(content.toString(), {
    ...process.env,
  });
}

module.exports = {
  mode: "development",
  context: __dirname + "/src",
  entry: {
    highlighter: "./highlighter.ts",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "icons", to: "icons" },
        {
          from: "manifest.json",
          to: "manifest.json",
          transform: transformFile,
        },
      ],
    }),
  ],
  externals: {},
};
