import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from '../types.js';

/**
 * action type
 */

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
}

export function loginFailure(data) {
  return {
    type: LOGIN_FAILURE,
    payload: data,
  };
}

export function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data,
  };
}

export function registerFailue(data) {
  return {
    type: REGISTER_FAILURE,
    payload: data,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
