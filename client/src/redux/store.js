import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import adsReducer from './adsRedux';
import usersReducer from './usersRedux';

const subreducers = {
  ads: adsReducer,
  users: usersReducer,
};

let reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'production') reduxDevTools = (f) => f;

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  compose(applyMiddleware(thunk), reduxDevTools)
);

export default store;
