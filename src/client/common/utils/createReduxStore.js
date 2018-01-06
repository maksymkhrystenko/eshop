import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import axios from 'axios';

import modules from '../../../client/modules';

export const storeReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  ...modules.reducers
});

const createReduxStore = (history, initialState) => {
  const middlewares = [
    thunk.withExtraArgument(axios),
    routerMiddleware(history)
  ];
  const composeEnhancers =
    (typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const enhancers = composeEnhancers(
    applyMiddleware(...middlewares)
    // Other store enhancers if any
  );
  return createStore(
    storeReducer,
    initialState, // initial state
    enhancers
  );
};

export default createReduxStore;
