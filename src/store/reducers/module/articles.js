
import * as types from '../../types.js'

/**
 * state
 */
const initState = {
    articlesList: [],
    total: 0
  }
  
  /**
   * reducer
   * @param {*} state 
   * @param {*} action 
   */
  export function articles(state=initState, action) {
    switch(action.type) {
      case types.SAVE_ARTICLES_LIST:
        return {
          ...state,
          articlesList: state.articlesList.length ? [...state.articlesList, ...action.payload.list] : action.payload.list,
          total: action.payload.count
        }
      default:
        return state
    }
  }
  