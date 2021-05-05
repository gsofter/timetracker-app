const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const path = require('path');

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
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.graphql', '.graphqls', '.gql'],
    },
    plugins: [
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
        ],
    },
    externals: [nodeExternals({ modulesDir: '../../../node_modules' }), nodeExternals()],
};

module.exports = webpack_opts;
