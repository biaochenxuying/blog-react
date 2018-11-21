import { combineReducers } from 'redux-immutable'
import { home } from './module/home'
import { user } from './module/user'
import { articles } from './module/articles'
const rootReducer = combineReducers({
  /* your reducers */
  home, 
  user,
  articles,
})
export default rootReducer
