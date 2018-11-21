import axios from 'axios';
import * as types from '../types.js';

/**
 * action type
 */

export function saveArticlesList(data) {
	return {
		type: types.SAVE_ARTICLES_LIST,
		payload: data,
	};
}

/**
 * aysnc function
 */

export function getArticlesList({ keyword, likes, state, pageNum, pageSize }) {
	return dispatch => {
		axios
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


