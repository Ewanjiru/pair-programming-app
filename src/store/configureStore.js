import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import ReduxPromise from 'redux-promise';

export const configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(ReduxPromise)
  );
};
