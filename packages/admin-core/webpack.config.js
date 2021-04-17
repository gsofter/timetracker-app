const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

<<<<<<< HEAD:packages/admin-core/webpack.config.js

var webpack_opts = {   
  mode: 'development',
  entry: './src/index.ts',
  target: 'node',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        test: /\.ts$/,
        ts: {
          compiler: 'typescript',
          configFile: 'tsconfig.json'
        },
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    })
  ],
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      loaders: 'ts-loader'
    }]
  },
  externals: [
    nodeExternals({ modulesDir: "../../node_modules" }),
    nodeExternals()
  ]
=======
const webpackOpts = {
    mode: 'development',
    entry: './src/index.ts',
    target: 'node',
    output: {
        path: path.join(__dirname, 'lib'),
        filename: 'index.js',
        libraryTarget: 'commonjs2',
        library: '@sample-stack/core',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                test: /\.ts$/,
                ts: {
                    compiler: 'typescript',
                    configFile: 'tsconfig.json',
                },
                tslint: {
                    emitErrors: true,
                    failOnHint: true,
                },
            },
        }),
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: 'ts-loader',
            },
        ],
    },
    externals: [
        nodeExternals({ modulesDir: '../../node_modules' }),
        nodeExternals(),
    ],
>>>>>>> 70cbf156158ee2db46f4dea739bb84a4d1d5880b:packages/sample-core/webpack.config.js
};

module.exports = webpackOpts;
