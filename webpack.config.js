module.exports = {
  context: __dirname,

  entry: {
    index: ['./example/index.js'],
  },

  output: {
    path: `${__dirname}/lib/`,
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /lib/],
        loaders: ['babel', 'eslint-loader'],
      },
    ],
  },
}
