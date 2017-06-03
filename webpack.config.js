const path = require('path');


const config = {
  devtool: 'eval-source-map',

  entry: path.join(__dirname, post-it-app/main.js),

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
        loader: 'babel',

        query: {
          presets: ['es2015']
        }
      }
    ]
  },
};

module.exports = config;
