/* eslint-disable */
var path = require('path');
var SpritesmithPlugin = require('webpack-spritesmith');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");


// Removed the CSS loader as we gonna rely on npm css library for components
// potentially will be using https://www.npmjs.com/package/jss
// or use it as reference for building and independent CSS package + generic components
var APP = path.resolve(__dirname, './blaze-ui.scss');

// Considering adding externals as we potentially will add peerDependencies
// https://www.npmjs.com/package/webpack-node-externals

module.exports = {
    entry: [APP],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '',
        filename: 'dist/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "dist/[name].css"
        })
    ],
    stats: {
        colors: true
    },
    devServer: {
        contentBase: path.join(__dirname, 'docs'),
        watchOptions: {
            ignored: ['images', 'sass/components/_sprite.scss', 'node_modules'],
        },
        open: true,
        writeToDisk: true
    }
};
