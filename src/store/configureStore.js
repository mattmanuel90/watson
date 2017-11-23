import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers';

const configureStore = (initialState = {}) => {

  const middlewares = [
    thunk
  ];

  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  const store = createStoreWithMiddleware(allReducers, initialState);
  return store;
};

export { configureStore };
