import https from '../../utils/https';
import { SAVE_ARTICLES_LIST } from '../types.js';

/**
 * action type
 */

export function saveArticlesList(data) {
  return {
    type: SAVE_ARTICLES_LIST,
    payload: data,
  };
}

/**
 * aysnc function
 */

export function getArticlesList({ keyword, likes, state, pageNum, pageSize }) {
  return dispatch => {
    https
      .get('/api/getArticleList', {
        params: {
          keyword,
          likes,
          state,
          pageNum,
          pageSize,
        },
      })
      .then(res => {
        // console.log('res :', res.data)
        if (res.status === 200 && res.data.code === 0) {
          dispatch(saveArticlesList(res.data));
        } else {
          // dispatch(listFailure(res.data.msg));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
}
