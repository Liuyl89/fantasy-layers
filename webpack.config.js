const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        vendor: ['./docs/vendor.js'],
        app: ['./docs/index.js'],

    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/docs'),
        libraryTarget: 'amd',
        publicPath: '/fantasy-layers/docs/',
    },
    resolve: {
        alias: {
            'fantasy-layers': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: [
                    'es2015',
                    'react',
                    'stage-1',
                ],
                plugins: [
                    'lodash',
                ],
            },
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: 'style-loader!css-loader!sass-loader',
        }, {
            test: /\.(png|gif)$/,
            loader: 'url-loader?limit=100000',
        }, {
            test: /\.jpg$/,
            loader: 'file-loader',
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        }, {
            test: /\.json$/,
            loader: 'json-loader',
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './docs/index.html',
            hash: true,
            filename: 'index.html',
            inject: false,
            title: 'Fantasy Layers',
            cdn: 'https://cdn.bootcss.com/',
            scripts: [{
                file: 'modernizr.min.js',
                path: 'modernizr/',
                version: '2.8.3',
            }, {
                file: 'jquery.min.js',
                path: 'jquery/',
                version: '3.2.1',
            }, {
                file: 'lodash.min.js',
                path: 'lodash.js/',
                version: '4.17.4',
            }, {
                file: 'prop-types.min.js',
                path: 'https://unpkg.com/prop-types/',
                version: '15.5.10',
                locale: true,
            }, {
                file: 'react.js',
                path: 'react/',
                version: '15.6.1',
            }, {
                file: 'react-dom.js',
                path: 'react/',
                version: '15.6.1',
            }, {
                file: 'react-router-dom.js',
                path: 'react-router-dom/',
                version: '4.1.2',
            }, {
                file: 'js/bootstrap.min.js',
                path: 'bootstrap/',
                version: '3.3.7',
            }, {
                file: 'fantasy-ui-react.js',
                path: 'http://localhost:8079/fantasy-ui-react/umd/',
                locale: true,
            }, {
                file: 'fantasy-map.js',
                path: 'http://localhost:8079/fantasy-map/umd/',
                locale: true,
            // }, {
            //     file: 'fantasy-layers.js',
            //     path: 'http://localhost:8079/fantasy-layers/umd/',
            //     locale: true,
            }, {
                file: 'init.js',
                path: 'https://localhost/arcgis_js_api/library/4.4/',
                version: '4.4',
                locale: true,
            }],
            links: [{
                rel: 'stylesheet',
                file: 'normalize.min.css',
                path: 'normalize/',
                version: '7.0.0',
            }, {
                rel: 'stylesheet',
                file: 'assets/main.css',
                locale: true,
                path: '',
            }, {
                rel: 'stylesheet',
                file: 'css/bootstrap.min.css',
                path: 'bootstrap/',
                version: '3.3.7',
            }, {
                rel: 'stylesheet',
                file: 'main.css',
                locale: true,
                path: 'https://localhost/arcgis_js_api/library/4.4/esri/css/',
            }],
            // 在index.html中define以下名称，使其在AMD中能够被正确引用
            // 这将在编译index.html文件是生成一些额外代码
            // 列表中的名称应该是要引用的库的全局变量名称
            dojoDefines: [
                'jQuery', '_', 'React', 'ReactDOM', 'ReactRouterDOM', 'PropTypes',
                'FantasyUIReact', 'FantasyMap',// 'FantasyLayers',
            ],
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'lodash',
        }),

    ],
    externals: [
        {
            jquery: 'jQuery',
            lodash: '_',
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            'prop-types': 'PropTypes',
            'fantasy-ui-react': 'FantasyUIReact',
            'fantasy-map': 'FantasyMap',
            // 'fantasy-layers': 'FantasyLayers',
        },
        (context, request, callback) => {
            if (/^dojo/.test(request) ||
                /^dojox/.test(request) ||
                /^dijit/.test(request) ||
                /^esri/.test(request)
            ) {
                return callback(null, `amd ${request}`)
            }
            return callback()
        },
    ],

}
