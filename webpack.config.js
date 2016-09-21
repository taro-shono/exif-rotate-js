const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,

  entry: {
    bundle: './src/rotate.js',
  },

  output: {
    path: __dirname + '/lib/',
    filename: 'index.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './index.html',
    })
  ],
}
