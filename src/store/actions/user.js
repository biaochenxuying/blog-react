import * as types from '../types.js'

/**
 * action type
 */

export function loginSuccess(data) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data
  }
}

export function loginFailure(data) {
  return {
    type: types.LOGIN_FAILURE,
    payload: data
  }
}

export function registerSuccess(data) {
  return {
    type: types.REGISTER_SUCCESS,
    payload: data
  }
}

export function registerFailue(data) {
  return {
    type: types.REGISTER_FAILURE,
    payload: data
  }
}

export function logout() {
  return {
    type: types.LOGOUT
  }
}
