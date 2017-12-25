/* @flow */

import React from 'react';
// $FlowFixMe: it's not an error
import {hydrate, unmountComponentAtNode} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
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

import configureStore from '../client/common/utils/createReduxStore';
import createApolloClient from './common/utils/createApolloClient';
import {setLanguage} from './common/utils/helpers';
import modules from './modules';
import config from "./config";


setLanguage(config.language);

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
const initialState = window.__APOLLO_STATE__;
const history = createHistory();

let store;
if (module.hot && module.hot.data && module.hot.data.store) {
  // console.log("Restoring Redux store:", JSON.stringify(module.hot.data.store.getState()));
  store = module.hot.data.store;
  store.replaceReducer(storeReducer);
} else {
  store = configureStore(history,{});
}

if (module.hot) {
  module.hot.dispose(data => {
    // console.log("Saving Redux store:", JSON.stringify(store.getState()));
    data.store = store;
    // Force Apollo to fetch the latest data from the server
    delete window.__APOLLO_STATE__;
  });
}



//const store = configureStore(history, initialState);
const mountNode = document.getElementById('react-view');

const renderApp = () => {
  const App = require('./app').default;
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

  module.hot.accept('./app', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(mountNode);
      reRenderApp();
    });
  });
}

renderApp();
