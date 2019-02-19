module.exports = {
  namespaced: true,
  state: {
    total: 4,
    current: 1
  },

  mutations: {
    SET(state, payload){
      state.current = payload;
    },
  },
  actions: {
    add({ commit, state}) {
      commit('SET', state.current++);
    },
    reset({ commit }) {
      commit('SET', 1);
    },
    set({ commit }, data) {
      commit('SET', data);
    }
  }
};