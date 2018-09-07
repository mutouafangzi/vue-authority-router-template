import Cookie from 'js-cookie'
const sidebar = {
  state: {
    sidebarOpen: !+Cookie.get('sidebarStatus')
  },
  mutations: {
    TOGGLE_SIDEBAR: (state, sidebarOpen) =>{
      state.sidebarOpen = sidebarOpen
    }
  },
  actions: {
    toggleSideBar({ commit, state}) {
      console.log('触发')
      if (state.sidebarOpen) {
        Cookie.set('sidebarStatus', 1)
        commit('TOGGLE_SIDEBAR', 1)
      } else {
        Cookie.set('sidebarStatus', 0)
        commit('TOGGLE_SIDEBAR', 0)
      }

    }
  }
}

export default sidebar
