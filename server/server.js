// Set up express
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleWare from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import routes from './index';

require('dotenv').config();

const app = express();

// configure port
const port = process.env.PORT || 6969;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const config= require('../webpack.config');   // eslint-disable-line
const compiler = webpack(config);
if (process.env.development) {
  app.use(webpackMiddleWare(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    noInfo: true,
  }));
  app.use(webpackHotMiddleWare(compiler));
}

app.use(express.static(path.join(__dirname, '../dist')));

// use routes imported
routes(app);

// default route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port);
