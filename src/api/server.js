/* @flow */

import path from 'path';
import morgan from 'morgan';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
import React from 'react';
import http from 'http';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router-dom';
import {Provider} from 'react-redux';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import './mongodb';
import './modules/Product/schemas';
import mongoose from 'mongoose';

import createHistory from 'history/createMemoryHistory';
import configureStore from '../redux/store';
import Html from '../utils/Html';
import App from '../containers/App/index';

import routes from '../routes';
import {port, host} from '../config/index';

const app = express();
let Product = mongoose.model('Product');
// Using helmet to secure Express with various HTTP headers
app.use(helmet());
// Prevent HTTP parameter pollution.
app.use(hpp());
// Compress all requests
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/addProduct', async (reg, res, next) => {
  let query = {
    title: 'Test prod1',
    description: 'Test desc2',
    shortDescription: 'Test short desc',
    price: 34,
    sku: '78666',
    properties: null,
    createdAt: new Date(),
    uid: 1
  };
  let product = new Product(query);
  await product.save().then(async (product) => {
    return next(product);
  }).catch((err) => {
    throw new Error(err)});
});
// Use morgan for http request debug (only show error)
app.use(morgan('dev', {skip: (req, res) => res.statusCode < 400}));
app.use(favicon(path.join(process.cwd(), './public/favicon.ico')));
app.use(express.static(path.join(process.cwd(), './public')));


// Run express as webpack dev server
if (__DEV__) {
  const webpack = require('webpack');
  const webpackConfig = require('../../tools/webpack/config.babel');

  const compiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      hot: true,
      noInfo: true,
      stats: 'minimal',
      serverSideRender: true
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));
}

// Register server-side rendering middleware
app.get('*', (req, res) => {
  if (__DEV__) webpackIsomorphicTools.refresh();

  const history = createHistory();
  const store = configureStore(history);
  // eslint-disable-next-line no-shadow
  const renderHtml = (store, htmlContent) => {
    const html = renderToStaticMarkup(
      <Html store={store} htmlContent={htmlContent}/>
    );

    return `<!doctype html>${html}`;
  };

  // If __DISABLE_SSR__ = true, disable server side rendering
  if (__DISABLE_SSR__) {
    res.send(renderHtml(store));
    return;
  }

  // Here's the method for loading data from server-side
  const loadBranchData = (): Promise<*> | Object => {
    const promises = [];

    routes.some(route => {
      const match = matchPath(req.path, route);

      if (match && route.loadData)
      // $FlowFixMe: the params of pre-load actions are dynamic
        promises.push(route.loadData(store.dispatch, match.params));

      return match;
    });

    return Promise.all(promises);
  };

  (async () => {
    try {
      // Load data from server-side first
      await loadBranchData();

      // Setup React-Router server-side rendering
      const routerContext = {};
      const htmlContent = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={routerContext}>
            <App/>
          </StaticRouter>
        </Provider>
      );

      // Check if the render result contains a redirect, if so we need to set
      // the specific status and redirect header and end the response
      if (routerContext.url) {
        res.status(301).setHeader('Location', routerContext.url);
        res.end();

        return;
      }

      // Checking is page is 404
      const status = routerContext.status === '404' ? 404 : 200;

      // Pass the route and initial state into html template
      res.status(status).send(renderHtml(store, htmlContent));
    } catch (err) {
      res.status(404).send('Not Found :(');

      console.error(`==> 😭  Rendering routes error: ${err}`);
    }
  })();
});





if (port) {
  let server = http.createServer(app);

  server.listen(port, () => {
    console.info(`API is now running on port ${port}`);
  });

/*  app.listen(port, host, err => {
    const url = `http://${host}:${port}`;

    if (err) console.error(`==> 😭  OMG!!! ${err}`);

    console.info(chalk.green(`==> 🌎  Listening at ${url}`));

    // Open Chrome
    require('../../tools/openBrowser/index')(url);
  });*/
} else {
  console.error(
    chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified')
  );
}
