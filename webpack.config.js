const path = require('path');


const config = {
  devtool: 'eval-source-map',

  entry: path.join(__dirname, './main.js'),

  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        query: {
          presets: ['es2015']
        }
      }
    ]
  },
};

module.exports = config;
