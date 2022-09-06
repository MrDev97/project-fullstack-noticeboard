import axios from 'axios';
import { API_URL } from '../config';

// selectors
export const getAllAds = ({ ads }) => ads.data;
export const getAdById = ({ ads }, adId) =>
  ads.data.find((ad) => ad._id === adId);
export const getRequest = ({ ads }) => ads.request;

// action name creator
const reducerName = 'ads';
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const REMOVE_AD = createActionName('REMOVE_AD');
const EDIT_AD = createActionName('EDIT_AD');

// actions
export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const addAd = (payload) => ({ payload, type: ADD_AD });
export const removeAd = (payload) => ({ payload, type: REMOVE_AD });
export const editAd = (payload) => ({ payload, type: EDIT_AD });

// thunks
export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'LOAD_ADS' }));
    try {
      let res = await axios.get(`${API_URL}/ads`);
      dispatch(loadAds(res.data));
      dispatch(endRequest({ name: 'LOAD_ADS' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_ADS', error: e.message }));
    }
  };
};

export const loadSearchedAdsRequest = (searchPhrase) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'LOAD_ADS' }));
    try {
      let res = await axios.get(`${API_URL}/ads/search/${searchPhrase}`);
      dispatch(loadAds(res.data));
      dispatch(endRequest({ name: 'LOAD_ADS' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_ADS', error: e.message }));
    }
  };
};

export const addAdRequest = (ad) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'ADD_AD' }));
    try {
      let res = await axios.post(`${API_URL}/ads`, ad);
      dispatch(addAd(res.data));
      dispatch(endRequest({ name: 'ADD_AD' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'ADD_AD', error: e.message }));
    }
  };
};

export const editAdRequest = (ad) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'EDIT_AD' }));
    try {
      let res = await axios.put(`${API_URL}/ads/${ad._id}`, ad);
      dispatch(editAd(res.data));
      dispatch(endRequest({ name: 'EDIT_AD' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'EDIT_AD', error: e.message }));
    }
  };
};

export const removeAdRequest = (ad) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'REMOVE_AD' }));
    try {
      let res = await axios.delete(`${API_URL}/ads/${ad._id}`);
      dispatch(removeAd(res.data));
      dispatch(endRequest({ name: 'REMOVE_AD' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'REMOVE_AD', error: e.message }));
    }
  };
};

// initial state
const initialState = {
  data: [],
  request: { pending: false, error: null, success: null },
};

// action creators
const adsReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ADS:
      return { ...statePart, data: [...action.payload] };
    case ADD_AD:
      return { ...statePart, data: [...statePart.data, action.payload] };
    case REMOVE_AD:
      return statePart.filter((ad) =>
        ad.id === action.payload ? false : true
      );
    case EDIT_AD:
      return statePart.map((ad) =>
        ad.id === action.payload.id ? { ...ad, ...action.payload } : ad
      );
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

export default adsReducer;
