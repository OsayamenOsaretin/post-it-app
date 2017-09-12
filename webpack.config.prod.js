const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const config = {
  entry: [
    path.join(__dirname, './client/src/main.js')],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.min.js',
    publicPath: '/',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
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
        loader: ['babel-loader'],
      },

      {
        test: /\.(css)$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|otf|eot|svg|ttf|woff)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      }
    ]
  },
};

module.exports = config;
