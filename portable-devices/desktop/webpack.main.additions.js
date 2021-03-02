const path = require('path');
var nodeExternals = require('webpack-node-externals');
const debug = process.env.DEBUGGING || false;
const {merge} = require('webpack-merge');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


let config = {
    target: 'electron-main',
    entry: './src/main/app.ts',
    output: {
        filename: 'index.js',
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: '../../tools/esm-wrapper.js',
            to: 'index.js',
        }]),
        new LodashModuleReplacementPlugin({
            // Necessary as a workaround for https://github.com/apollographql/react-apollo/issues/1831
            flattening: true,
            shorthands: true
          }),
    ],
    externals: [
        nodeExternals(),
        nodeExternals({ allowlist: [/webpack\/hot/i, /babel-polyfill/], modulesDir: "../../node_modules" })
    ],
}



module.exports = config;
