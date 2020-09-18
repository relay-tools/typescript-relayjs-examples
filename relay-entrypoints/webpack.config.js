const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
module.exports = {
  mode: "development",
  entry: "./src/Shell.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    publicPath: "/",
    path: __dirname + "/out",
  },
  devServer: {
    contentBase: __dirname + "/public",
    port: 8731,
    historyApiFallback: true,
    before: (app, server, compiler) => {
      app.use(bodyParser.json());
    },
    after: (app, server, compiler) => {
      app.post("/api/graphql", (req, res) => {
        if (req.header("content-type") === "application/json") {
          const body = req.body;
          fs.readFile("./queries.json", (err, data) => {
            const queries = JSON.parse(data);
            const postData = JSON.stringify({
              query: queries[body.query] || body.query,
              variables: body.variables,
            });
            const options = {
              hostname: "api.github.com",
              //port: 443,
              path: "/graphql",
              method: "POST",
              headers: {
                "User-Agent": req.header("user-agent"),
                Authorization:
                  "Bearer " + process.env.REACT_APP_GITHUB_AUTH_TOKEN,
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(postData),
              },
            };

            const apiReq = https.request(options, (githubResponse) => {
              res.status(githubResponse.statusCode);
              githubResponse.setEncoding("utf8");

              githubResponse.on("data", (chunk) => {
                res.write(chunk);
              });
              githubResponse.on("end", () => {
                res.end();
              });
            });

            apiReq.on("error", (error) => {
              res.status(500).send({ message: error.message });
            });
            apiReq.write(postData);
            apiReq.end();
          });
        } else {
          res.status(415).end();
        }
      });
    },
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
