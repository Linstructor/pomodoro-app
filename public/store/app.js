module.exports = {
  namespaced: true,
  state: {
    isSettingsPageShow: false
  },

  mutations: {
    SET_PAGE_SETTINGS(state, payload){
      state.isSettingsPageShow = payload;
    },
  },
  actions: {
    showSettings({commit}) {
      commit('SET_PAGE_SETTINGS', true);
    },
    hideSettings({commit}) {
      commit('SET_PAGE_SETTINGS', false);
    },
  }
};