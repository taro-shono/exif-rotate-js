var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,

  entry: {
    example: './example/index.js',
    bundle: './src/exif-rotate.js',
  },

  output: {
    path: `${__dirname}/lib/`,
    filename: '[name].js',
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /lib/],
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /lib/],
        loaders: ['babel'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },

  eslint: {
    configFile: './.eslintrc',
  },

  devtool: 'source-map',

  watchOptions: {
    poll: true,
  },

  devServer: {
    contentBase: 'lib',
    port: 8080,
    hot: true,
    inline: true,
    host: '0.0.0.0',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './example/index.html',
      filename: 'index.html',
    }),
  ],
}
