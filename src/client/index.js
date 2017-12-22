/* @flow */

import React from 'react';
// $FlowFixMe: it's not an error
import {hydrate, unmountComponentAtNode} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from 'react-router-redux';
import {SubscriptionClient} from "subscriptions-transport-ws";
import RedBox from 'redbox-react';
import {getOperationAST} from 'graphql';
import {createApolloFetch} from 'apollo-fetch';
import {BatchHttpLink} from 'apollo-link-batch-http';
import {ApolloLink} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {LoggingLink} from 'apollo-logger';
import {ApolloProvider} from 'react-apollo';

import configureStore from '../common/createReduxStore';
import createApolloClient from '../common/createApolloClient';
import modules from './modules';


const fetch = createApolloFetch({
  uri: '/graphql',
  constructOptions: modules.constructFetchOptions
});
const cache = new InMemoryCache();

for (const middleware of modules.middlewares) {
  fetch.batchUse(({requests, options}, next) => {
    options.credentials = 'same-origin';
    options.headers = options.headers || {};
    const reqs = [...requests];
    const innerNext = () => {
      if (reqs.length > 0) {
        const req = reqs.shift();
        if (req) {
          middleware(req, options, innerNext);
        }
      } else {
        next();
      }
    };
    innerNext();
  });
}

for (const afterware of modules.afterwares) {
  fetch.batchUseAfter(({response, options}, next) => {
    afterware(response, options, next);
  });
}

let connectionParams = {};
for (const connectionParam of modules.connectionParams) {
  Object.assign(connectionParams, connectionParam());
}

const wsUri = ('http://localhost:3004/graphql').replace(/^http/, 'ws');

const wsClient = new SubscriptionClient(wsUri, {
  reconnect: true,
  connectionParams: connectionParams
});

wsClient.use([
  {
    applyMiddleware(operationOptions, next) {
      let params = {};
      for (const param of modules.connectionParams) {
        Object.assign(params, param());
      }

      Object.assign(operationOptions, params);
      next();
    }
  }
]);

wsClient.onDisconnected(() => {
  //console.log('onDisconnected');
});

wsClient.onReconnected(() => {
  //console.log('onReconnected');
});

let link = ApolloLink.split(
  operation => {
    const operationAST = getOperationAST(operation.query, operation.operationName);
    return !!operationAST && operationAST.operation === 'subscription';
  },
  new WebSocketLink(wsClient),
  new BatchHttpLink({fetch})
);

// if (__PERSIST_GQL__) {
//   networkInterface = addPersistedQueries(networkInterface, queryMap);
// }

const client = createApolloClient({
  link: ApolloLink.from(([new LoggingLink()]).concat([link])),
  cache
});

if (window.__APOLLO_STATE__) {
  cache.restore(window.__APOLLO_STATE__);
}


// Get initial state from server-side rendering
const initialState = window.__INITIAL_STATE__;
const history = createHistory();
const store = configureStore(history, initialState);
const mountNode = document.getElementById('react-view');

/*
const settingUrl = `http://localhost:3000/graphql`;
const networkInterface = createNetworkInterface({uri: settingUrl});
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
});
*/


const renderApp = () => {
  const App = require('./containers/App').default;

  hydrate(
    modules.getWrappedRoot(<AppContainer errorReporter={({error}) => <RedBox error={error}/>}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ConnectedRouter history={history}>
            <App/>
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    </AppContainer>),
    mountNode
  );
};

// Enable hot reload by react-hot-loader
if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp();
    } catch (error) {
      hydrate(<RedBox error={error}/>, mountNode);
    }
  };

  module.hot.accept('./containers/App', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(mountNode);
      reRenderApp();
    });
  });
}

renderApp();
