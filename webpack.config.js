'use strict';

const path = require('path');
const webpack = require("webpack");

const nodeModulePath = path.join(__dirname, '..', '..', '..', 'node_modules');

module.exports = {
    debug: true,
    entry: {
        app: path.join(__dirname, 'src', 'main', 'javascript', 'app')
    },
    output: {
        path: path.join(__dirname, 'target', 'delivery-pipeline-plugin'),
        filename: 'pipe.js',
        publicPath: '/static/b182aeab/plugin/delivery-pipeline-plugin/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(woff|otf|ttf|eot|svg|png|gif|ico)(.*)?$/,
                loader: 'file'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ],
        noParse: /min\.js/
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        root: nodeModulePath
    },
    devServer: {
        port: 3000,
        host: "0.0.0.0",
        proxy: {
            '*': {
                target: 'http://localhost:8080/',
                secure: false
            }
        }
    }
};