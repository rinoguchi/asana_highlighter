const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  context: __dirname + "/src",
  devtool: "source-map", // NOTE: バンドルしたJSでevalを使わない。manifest V3ではevalは許可されていない。「Uncaught EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self'".」回避
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
      //
      {
        test: /\.css$/,
        use: [
          "style-loader", // 読み込んだスタイルを<style>タグとしてhtmlに出力する
          "css-loader", // .cssファイルをJSで文字列として読み込む
        ],
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
        },
      ],
    }),
  ],
  externals: {},
};
