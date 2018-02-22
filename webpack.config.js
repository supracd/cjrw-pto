var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                        extractCSS: true
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
                PORT: process.env.PORT
            }
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    new ExtractTextPlugin("style.css"),
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //
    //       dead_code: true,
    //       unused: true,
    //       if_return: true,
    //       join_vars: true,
    //       drop_console: false
    //     },
    //
    //     output: {
    //       comments: false
    //     }
    // })
],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#source-map'
}
