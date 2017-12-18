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
import mongoose from 'mongoose';
import createHistory from 'history/createMemoryHistory';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router-dom';
import {Provider} from 'react-redux';
import chalk from 'chalk';
import bodyParser from 'body-parser';
import {graphqlExpress} from 'graphql-server-express';
import {ApolloProvider} from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import {LoggingLink} from "apollo-logger";
import {BatchHttpLink} from "apollo-link-batch-http";
import {createApolloFetch} from "apollo-fetch";
import {InMemoryCache} from "apollo-cache-inmemory";

import graphiqlMiddleware from './graphiql';

import './mongodb';
import './modules/Product/schemas';
import modules from './modules';
import schema from './schema';

import configureStore from '../client/redux/store';
import Html from '../client/utils/Html';
import App from '../client/containers/App/index';

import routes from '../client/routes';
import {port, host} from '../client/config/index';
import createApolloClient from '../common/createApolloClient';
import addGraphQLSubscriptions from './subscriptions';

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

app.use('/graphql',
  graphqlExpress((req, res) => {
    const query = req.query.query || req.body.query;
    if (query && query.length > 4000) {
      throw new Error('Query too large.');
    }
    return {
      schema,
      context: {...modules.createContext(), req, res}
    };
  }));
app.use('/graphiql', (...args) => graphiqlMiddleware(...args));
app.use((req, res, next) => {
  if (req.originalUrl === '/') {
    express.static('assets')(req, res, next);
  } else {
    express.static('dist')(req, res, next)
  }
});

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
    throw new Error(err)
  });
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

  // If __SSR__ = false, disable server side rendering
  if (!__SSR__) {
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


  const apiUrl = 'http://localhost:3000/graphql';
  const fetch = createApolloFetch({ uri: apiUrl, constructOptions: modules.constructFetchOptions });
  fetch.batchUse(({ options }, next) => {
    try {
      options.credentials = 'include';
      options.headers = req.headers;
    } catch (e) {
      console.error(e);
    }

    next();
  });
  const cache = new InMemoryCache();

  let link = new BatchHttpLink({ fetch });





 // const link = `http://localhost:3000/graphql`;

  const client = createApolloClient({
    link: ApolloLink.from(([new LoggingLink()]).concat([link])),
    cache
  });



/*  const networkInterface = createNetworkInterface({uri: settingUrl});
  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }

      const token = localStorage.getItem('auth-token');
      if (token) {
        req.options.headers['Authorization'] = token;
      }
      next();
    }
  }]);

  /!*const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    /!*wsClient,*!/
  );*!/

  const createApolloClient = (options) => new ApolloClient(Object.assign({}, {
    queryTransformer: addTypename,
    dataIdFromObject: (result) => {
      if (result.id && result.__typename) { // eslint-disable-line no-underscore-dangle
        return result.__typename + result.id; // eslint-disable-line no-underscore-dangle
      }
      return null;
    },
    // shouldBatch: true,
  }, options));

  const client = createApolloClient({
    networkInterface: networkInterface,
    initialState: window.__APOLLO_STATE__,
    ssrForceFetchDelay: 100
  });*/


  (async () => {
    try {
      // Load data from server-side first
      await loadBranchData();

      // Setup React-Router server-side rendering
      const routerContext = {};
      const htmlContent = renderToString(
        <Provider store={store}>
          <ApolloProvider client={client}>
            <StaticRouter location={req.url} context={routerContext}>
              <App/>
            </StaticRouter>
          </ApolloProvider>
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
  const url = `http://${host}:${port}`;
  server.listen(port, () => {
    console.info(`API is now running on port ${port}`);
    // Open Google Chrome
    require('../../tools/openBrowser/index')(url);
  });
  addGraphQLSubscriptions(server);
  server.on('close', () => {
    server = undefined;
  });
} else {
  console.error(
    chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified')
  );
}
