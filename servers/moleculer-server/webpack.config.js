const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const webpackOpts = {
    mode: 'development',
    entry: {
        main: './src/index.ts',
        'moleculer.config': './src/config/moleculer.config.ts',
    },
    target: 'node',
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '../../tools/esm-wrapper.js',
                    to: 'index.js',
                },
            ],
        }),
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
                use: 'ts-loader',
                exclude: /(node_modules)/,
            },
        ],
    },
    externals: [nodeExternals({ modulesDir: '../../node_modules' }), nodeExternals()],
};

module.exports = webpackOpts;
