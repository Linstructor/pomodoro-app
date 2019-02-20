module.exports = {
  namespaced: true,
  state: {
    alwaysOnTop: window.localStorage.getItem('alwaysOnTop') === 'true',
    duration: window.localStorage.getItem('duration'),
    first: window.localStorage.getItem('first'),
  },

  mutations: {
    CHANGE_DURATION(state, payload){
      window.localStorage.setItem('duration', payload);
      state.duration = payload;
    },
    UNFIRST(state){
      window.localStorage.setItem('first', false);
      state.first = false;
    },
    CHANGE_ALWAYS_TOP(state, payload){
      window.localStorage.setItem('alwaysOnTop', payload);
      require('electron').ipcRenderer.send('settings-change', {alwaysOnTop: payload});
      state.alwaysOnTop = payload;
    },
  },
  actions: {
    setDuration({ commit, state}, data) {
      commit('CHANGE_DURATION', parseInt(data));
    },
    setAlwaysOntop({ commit, state}, data) {
      commit('CHANGE_ALWAYS_TOP', data);
    }
  }
};