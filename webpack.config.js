'use strict';

const path = require('path');
const webpack = require('webpack');

const nodeModulePath = path.join(__dirname, '..', '..', '..', 'node_modules');

module.exports = {
    debug: true,
    cache: true,
    devtool: 'source-map',
    entry: {
        app: path.join(__dirname, 'src', 'main', 'javascript', 'app')
    },
    output: {
        path: path.join(__dirname, 'target', 'delivery-pipeline-plugin'),
        filename: 'pipe.js',
        publicPath: '/plugin/delivery-pipeline-plugin/'
    },
    module: {
        preLoaders: [
            {
                test: /\.(jsx|js)?$/,
                loaders: ['eslint'],
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.(js|jsx)$/,
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
        root: [
            path.resolve(__dirname, 'src', 'main', 'javascript'),
            path.resolve(__dirname, 'node_modules')
        ],
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        root: nodeModulePath
    },
    devServer: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
            // Ugly hack to workaround Jenkins's static file URLs
            '/static/*/plugin/delivery-pipeline-plugin/*': {
                target: 'http://localhost:3000/',
                secure: false,
                rewrite: (req) => req.url = '/' + req.url.split('/').splice(3).join('/')
            },
            '*': {
                target: 'http://localhost:8080/',
                secure: false
            }
        }
    }
};
