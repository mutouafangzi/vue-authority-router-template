import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import login from './modules/login'
import permissionRouter from './modules/permissionRouter'
import sidebar from './modules/toggleSidebar'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login,
    permissionRouter,
    sidebar
  },
  getters
})

export default store
