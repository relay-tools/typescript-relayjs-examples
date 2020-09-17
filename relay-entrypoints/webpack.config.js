const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/Shell.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: __dirname + "/out",
  },
  devServer: {
    contentBase: __dirname + "/public",
    port: 8731,
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              // extends: path.resolve(__dirname, "../babel.config.js")
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      templateContent: ({ htmlWebpackPlugin }) => `
        <html>
          <head>
            ${htmlWebpackPlugin.tags.headTags}
          </head>
          <body>
            <div id="app"></div>
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `,
    }),
  ],
};
