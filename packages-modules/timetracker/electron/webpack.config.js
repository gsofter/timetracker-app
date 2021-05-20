const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpack_opts = {
    mode: 'development',
    entry: {
        index: './src/index.ts',
    },
    target: 'node',
    output: {
        path: path.join(__dirname, 'lib'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.graphql', '.graphqls', '.gql', '.native.tsx', '.native.ts'],
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.LoaderOptionsPlugin({
            options: {
                test: /\.tsx?$/,
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
                test: /\.tsx?$/,
                loaders: 'ts-loader',
                options: {
                    compilerOptions: {
                        outDir: path.join(),
                    },
                },
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')],
                    plugins: [require.resolve('@babel/plugin-proposal-class-properties')],
                },
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },
            {
                test: /\.(gql)$/,
                exclude: /node_modules/,
                use: ['graphql-tag/loader'],
            },
            {
                test: /\.graphql?/,
                exclude: /node_modules/,
                use: 'raw-loader',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')({
                                        browsers: ['> 1%', 'last 2 versions'],
                                    }),
                                ],
                                config: { path: './src/postcss.config.js' },
                            },
                        },
                    ],
                }),
            },
        ],
    },
    externals: [
        nodeExternals({
            allowlist: ['antd/lib/**/*.css'],
            modulesDir: '../../../node_modules',
        }),
        nodeExternals(),
    ],
};

module.exports = webpack_opts;
