import * as types from '../../types'

// 初始化状态
let initNavList = {
	activeNav: 'home', //过渡动画样式
	navMain: ['home', 'me'],
};

export function home(state = initNavList, action) {
	switch (action.type) {
		case types.ACTIVE_NAV:
			return {
				...state,
				activeNav: action.activeNav,
			};
		case types.RECEIVE_NAV:
			return {
				...state, //三个点是展开符
				navMain: action.navMain,
			};
		default:
			return state;
	}
}
