// Actions
import { signout } from "../../shared/helpers/firebase";
import { async } from "q";

const SET_USER = "ticketDetective/user/SET_USER";
const USER_LOGOUT = "ticketDetective/user/LOGOUT";
const UPDATE_USER = "ticketDetective/user/UPDATE_USER";

// Reducer
export default function reducer(state = null, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case SET_USER:
      return { ...action.payload };
    case USER_LOGOUT:
      return action.payload;
    default:
      return state;
  }
}

// Action Creators
export const setUser = payload => {
  return { type: SET_USER, payload };
};

export const addRecord = async record => {
  return {
    type: UPDATE_USER,
    payload: record
  };
};

export const logoutUser = () => {
  signout();
  return {
    type: USER_LOGOUT,
    payload: null
  };
};
