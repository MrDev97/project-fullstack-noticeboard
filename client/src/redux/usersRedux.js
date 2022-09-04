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

const ADD_USER = createActionName('ADD_USER');

// actions
export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

// export const addUser = (payload) => ({ payload, type: ADD_USER });

// thunks
export const addRegistrationRequest = (user) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'ADD_USER' }));
    try {
      let res = await axios.post(`${API_URL}/users`, user);
      //   dispatch(addUser(res.data));
      dispatch(endRequest({ name: 'ADD_USER' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'ADD_USER', error: e.message }));
    }
  };
};

// initial state
const initialState = {
  data: [],
  request: { pending: false, error: null, success: null },
};

// action creators
const usersReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case ADD_USER:
      return { ...statePart, data: [...statePart.data, action.payload] };
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
        request: { pending: false, error: action.error, success: false },
      };
    default:
      return statePart;
  }
};

export default usersReducer;
