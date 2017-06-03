import path from 'path';
import webpack from 'webpack';


const config = {
  devtool: 'eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, './main.js')],

  output: {
    path: path.join(__dirname, '/dist/'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        query: {
          presets: ['es2015']
        }
      },

      {
      test: /\.css?$/,
      loader: 'style!css'
    }
    ]
  },
};

module.exports = config;
