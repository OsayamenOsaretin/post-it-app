// Set up express
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import index from './index';

require('dotenv').config();

const app = express();

// configure port
const port = process.env.PORT || 6969;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


if (process.env.NODE_ENV !== 'production') {
  const config= require('../webpack.config');   // eslint-disable-line
  const compiler = webpack(config);
  app.use(webpackMiddleWare(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    noInfo: true,
  }));
  app.use(webpackHotMiddleWare(compiler));

  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, '../../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

index(app);

app.listen(port);
