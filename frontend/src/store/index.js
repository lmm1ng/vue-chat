import { createStore } from 'vuex'
import auth from './auth'
import users from './users'
import chat from './chat'

export default createStore({
  modules: {
    auth,
    users,
    chat
  }
})
