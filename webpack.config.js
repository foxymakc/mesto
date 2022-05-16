const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: './src/pages/index.js',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
        cache: false,
        }),
        new MiniCssExtractPlugin({
            filename: 'main.[hash].css'
        }),
        new CleanWebpackPlugin (),

    ],
    mode: "development",
    module:{
        rules: [
            {
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                 },
                 {
                     loader: "css-loader",
                     options: {
                         importLoaders: 1,
                     }
                 },
                 {
                     loader: 'postcss-loader' 
                 },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?)|eot|ttf|otf/,
                type: "asset/resource",
              },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        compress: true,
        port: 8080,
        open: true,
        static: {
            directory: path.resolve(__dirname, "./dist"),
           },
    },
    devtool: 'inline-source-map',
};  