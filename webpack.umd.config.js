const path = require('path'),
    webpackConfig = require('./webpack.config'),
    pkg = require('./package.json')

module.exports = {
    entry: {
        [pkg.name]: ['./src/umd.js'],
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'var',
        library: 'FantasyLayers',
        path: path.resolve(__dirname, 'dist', 'umd'),
        publicPath: '/',
        pathinfo: true,
    },
    module: {
        rules: webpackConfig.module.rules,
    },
    plugins: [],
    externals: [
        {
            jquery: 'jQuery',
            lodash: '_',
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            'prop-types': 'PropTypes',
        },
    ],
}
