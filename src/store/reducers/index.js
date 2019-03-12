
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { home } from './module/home'
import { user } from './module/user'
import { articles } from './module/articles'

const rootReducer = (history) => combineReducers({
  home, 
  user,
  articles,
  router: connectRouter(history)
})

export default rootReducer



