import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import adsReducer from './adsRedux';
import usersReducer from './usersRedux';

const subreducers = {
  ads: adsReducer,
  users: usersReducer,
};

let reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f;

if (process.env.NODE_ENV === 'production') reduxDevTools = '';

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), reduxDevTools)
);

export default store;
