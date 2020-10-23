var nodeExternals = require("webpack-node-externals");
var webpack = require("webpack");
var path = require("path");
var fs = require("fs");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const lessToJs = require('less-vars-to-js');
// const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));

var webpack_opts = {
  mode: "development",
  entry: "./src/index.ts",
  target: "node",
  output: {
    path: path.join(__dirname, "lib"),
    filename: "index.js",
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.LoaderOptionsPlugin({
      options: {
        test: /\.tsx?$/,
        ts: {
          compiler: "typescript",
          configFile: "tsconfig.json"
        },
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    })
  ],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: "ts-loader"
      },
      {
        test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        use: [
          {
            loader: "url-loader"
          }
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader"
      },
      { test: /\.svg$/, loader: "url-loader?limit=10000" },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { importLoaders: 1 } },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [
                  require("autoprefixer")({
                    browsers: ["> 1%", "last 2 versions"]
                  })
                ],
                config: { path: "./src/postcss.config.js" }
              }
            }
          ]
        })
      }
    ]
  },
  externals: [
    nodeExternals({
      whitelist: [/.*\.css$/],
      modulesDir: "../../node_modules"
    }),
    nodeExternals()
  ]
};

module.exports = webpack_opts;
