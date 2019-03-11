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



module.exports = function (env, argv) {
    return [{
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
                },
                {
                    test: /\.png$/, use: [
                        'file-loader?name=i/[hash].[ext]'
                    ]
                }
            ]
        },
        plugins: [
            new SpritesmithPlugin({
                src: {
                    cwd: path.resolve(__dirname, 'images'),
                    glob: '*.png'
                },
                target: {
                    image: path.resolve(__dirname, 'public/images/sprite.png'),
                    css: path.resolve(__dirname, 'sass/components/_sprite.scss')
                },
                apiOptions: {
                    cssImageRef: path.resolve(__dirname, 'images/sprite.png'),
                }
            }),
            new MiniCssExtractPlugin({
                filename: "dist/[name].css"
            })
        ],
        stats: {
            colors: true
        },
        devServer: {
            contentBase: path.join(__dirname, 'public/docs'),
            watchOptions: {
                ignored: ['images', 'sass/components/_sprite.scss', 'node_modules'],
            },
            writeToDisk: true
        }
    }]
};
