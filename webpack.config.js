'use strict';

const path = require('path');
const webpack = require('webpack');

const nodeModulePath = path.join(__dirname, '..', '..', '..', 'node_modules');

module.exports = {
    debug: true,
    entry: {
        app: path.join(__dirname, 'src', 'main', 'javascript', 'app')
    },
    output: {
        path: path.join(__dirname, 'target', 'delivery-pipeline-plugin'),
        filename: 'pipe.js',
        publicPath: '/static/e17b7987/plugin/delivery-pipeline-plugin/'
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
            '*': {
                target: 'http://localhost:8080/',
                secure: false,
                bypass: function(req, res, proxyOptions) {
                    if (req.url.endsWith('/plugin/delivery-pipeline-plugin/pipe.js')) {
                        return '/target/delivery-pipeline-plugin/pipe.js';
                    }
                }
            }
        }
    }
};