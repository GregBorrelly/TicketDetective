// Actions
import { signout } from "../../shared/helpers/firebase";

const SET_USER = "ticketDetective/user/SET_USER";
const USER_LOGOUT = "ticketDetective/user/LOGOUT";

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
export function setUser(payload) {
  return { type: SET_USER, payload };
}

export function logoutUser() {
  signout();
  return {
    type: USER_LOGOUT,
    payload: null
  };
}

