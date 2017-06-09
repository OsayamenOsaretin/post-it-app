const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const config = {
  devtool: 'source-map',

  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './client/src/main.js')],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './client/src/index.html'
    })
  ],

  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

      {
        test: /\.(css)$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
};

module.exports = config;
