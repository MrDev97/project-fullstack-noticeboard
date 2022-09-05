import axios from 'axios';
import { API_URL } from '../config';

// selectors
export const getRequest = ({ users }) => users.request;

// action name creator
const reducerName = 'users';
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

// actions
export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

// thunks
export const addRegistrationRequest = (user) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'REGISTER_USER' }));
    try {
      await axios.post(`${API_URL}/auth/register`, user);
      dispatch(endRequest({ name: 'REGISTER_USER' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'REGISTER_USER', error: e.message }));
    }
  };
};

// initial state
const initialState = {
  data: [],
  request: {},
};

// action creators
const usersReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...statePart,
        request: { pending: true, error: null, success: false },
      };
    case END_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: null, success: true },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        request: {
          pending: false,
          error: action.payload.error,
          success: false,
        },
      };
    default:
      return statePart;
  }
};

export default usersReducer;
