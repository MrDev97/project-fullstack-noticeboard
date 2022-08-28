import axios from 'axios';
import { API_URL } from '../config';

// selectors
export const getAllAds = (state) => state.ads;
export const getAdById = ({ ads }, adId) => ads.find((ad) => ad.id === adId);

// action name creator
const reducerName = 'ads';
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_ADS = createActionName('ADD_ADS');

// actions
export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const addAd = (payload) => ({ payload, type: ADD_ADS });

// initial state
const initialState = {
  data: [],
  requests: {},
};

// action creators
const adsReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ADS:
      return { ...statePart, data: [...action.payload] };
    case ADD_ADS:
      return { ...statePart, data: [...statePart.data, action.payload] };
    default:
      return statePart;
  }
};

export default adsReducer;
