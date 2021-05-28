const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = [
    new ForkTsCheckerWebpackPlugin({
        formatter: 'basic',
        typescript: {
            diagnosticOptions: {
                semantic: true,
                syntactic: true,
            }
        },
    }),
    new MiniCssExtractPlugin({
        filename: global.webpack.production ? 'css/[name].css?v=[hash]' : 'css/[name].css',
    }),
    new webpack.DefinePlugin({
        __PRODUCTION__: global.webpack.production,
        __DEVELOPMENT__: global.webpack.development,
        'process.env.NODE_ENV': JSON.stringify(global.webpack.env),
        'process.env.CONFIG': JSON.stringify(global.webpack.config),
    }),
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../../assets/html/index.html'),
        inject: 'body',
        hashHTMLString: '1',
        minify: global.webpack.production && {
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
            keepClosingSlash: true,
        },
    }),
];

module.exports = config;
