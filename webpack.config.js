'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
var path = require('path');


var appConfig = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        index: './index.js'
    },
    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },
    //devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,
    devtool: 'inline-source-map',
    plugins: [
        new webpack.IgnorePlugin(/\.\/locale/)
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: ['babel-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                use: ['ignore-loader']
            }

        ]
    },
    resolve: {
        modules: [
            path.resolve('./src/'),
            'node_modules'
        ],
        alias: {},
        extensions: ['.js', '.jsx']
    }
};

console.log('NODE_ENV', NODE_ENV);
if (NODE_ENV == 'production') {
    appConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // don't show unreachable variables etc
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}

/*
var uiConfig = Object.assign({}, appConfig);
*/


module.exports = appConfig;