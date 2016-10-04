module.exports = {
  context: __dirname,

  entry: {
    'exif-rotate': './src/exif-rotate.js',
    sample: './sample.js',
  },

  output: {
    path: `${__dirname}/lib/`,
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
}
