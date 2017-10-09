const path = require('path'),
    del = require('del'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    webpackConfig = require('../webpack.config'),
    WebpackDevServer = require('webpack-dev-server'),
    staticServer = require('node-static'),
    http = require('http'),
    name = ':docs:fantasy-layers'

gulp.task(`clean${name}`, (cb) => {
    del.sync('./dist/docs/**/*', { force: true })
    cb()
})

gulp.task(`copy${name}`, (cb) => {
    gulp.src('./docs/404.html')
        .pipe(gulp.dest('./dist/docs'))
    gulp.src('./docs/site.webmanifest')
        .pipe(gulp.dest('./dist/docs/assets'))
    gulp.src('./docs/css/main.css')
        .pipe(gulp.dest('./dist/docs/assets'))
    gulp.src('./docs/assets/img/favicon.ico')
        .pipe(gulp.dest('./dist/docs/assets'))
    gulp.src('./docs/assets/img/icon.png')
        .pipe(gulp.dest('./dist/docs/assets'))
    cb()
})

gulp.task(`build-dev${name}`, [`clean${name}`, `copy${name}`, `webpack:build-dev${name}`], () => {
    gulp.watch(['src/**/*', 'docs/**/*'], [`webpack:build-dev${name}`])
})

// Production build
gulp.task(`build${name}`, [`clean${name}`, `copy${name}`, `webpack:build${name}`])

gulp.task(`webpack:build${name}`, (callback) => {
    // modify some webpack config options
    const myConfig = Object.create(webpackConfig)
    myConfig.plugins = myConfig.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
            },
            sourceMap: true,
        }),
    ])

    // run webpack
    webpack(myConfig, (err, stats) => {
        if (err) throw new gutil.PluginError(`webpack:build${name}`, err)
        gutil.log('[webpack:build]', stats.toString({
            colors: true,
        }))
        callback()
    })
})

// modify some webpack config options
const myDevConfig = Object.create(webpackConfig)
myDevConfig.devtool = 'source-map'

// create a single instance of the compiler to allow caching
const devCompiler = webpack(myDevConfig)

gulp.task(`webpack:build-dev${name}`, (callback) => {
    // run webpack
    devCompiler.run((err, stats) => {
        if (err) throw new gutil.PluginError(`webpack:build-dev${name}`, err)
        gutil.log('[webpack:build-dev]', stats.toString({
            colors: true,
        }))
        callback()
    })
})

gulp.task(`webpack-dev-server${name}`, [`copy${name}`], () => {
    // modify some webpack config options
    const hostName = 'localhost',
        host = `http://${hostName}:`,
        port = 8070,
        staticPort = 8071,
        myConfig = Object.create(webpackConfig)
    myConfig.devtool = 'source-map'
    myConfig.entry.app.unshift(
        `webpack-dev-server/client?http://localhost:${port}`,
        'webpack/hot/dev-server')
    myConfig.plugins = myConfig.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
    ])
    myConfig.module.rules[0].query.env = {
        development: {
            presets: ['react-hmre'],
        },
    }
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: myConfig.output.publicPath,
        inline: true,
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        stats: {
            colors: true,
        },
        proxy: {
            [`${myConfig.output.publicPath}assets/*`]: {
                target: host + staticPort,
                pathRewrite: { [`${myConfig.output.publicPath}`]: '/' },
            },
            [`${myConfig.output.publicPath}404.html`]: {
                target: host + staticPort,
            },
        },
        historyApiFallback: {
            index: myConfig.output.publicPath,
        },
    }).listen(port, 'localhost', (err) => {
        if (err) throw new gutil.PluginError(`webpack-dev-server${name}`, err)
        gutil.log('[webpack-dev-server]',
            `${host + port + myConfig.output.publicPath}index.html`)
    })

    const fileServer = new staticServer.Server('./dist/docs')
    http.createServer((request, response) => {
        request.addListener('end', () => {
            fileServer.serve(request, response)
        }).resume()
    }).listen(staticPort)
})
