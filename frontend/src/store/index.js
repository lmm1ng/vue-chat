import { createStore } from 'vuex'
import auth from './auth'
import users from './users'

export default createStore({
  modules: {
    auth,
    users
  }
})
