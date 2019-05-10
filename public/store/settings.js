module.exports = {
  namespaced: true,
  state: {
    alwaysOnTop: window.localStorage.getItem('alwaysOnTop') ? window.localStorage.getItem('alwaysOnTop') === 'true' : false,
    duration: window.localStorage.getItem('duration') ? window.localStorage.getItem('duration') : 25,
    first: window.localStorage.getItem('first') ? window.localStorage.getItem('first') === 'true' : true,
    darkMode: window.localStorage.getItem('darkMode') ? window.localStorage.getItem('darkMode') === 'true' : false,
    autoDarkMode: window.localStorage.getItem('autoDarkMode') ? window.localStorage.getItem('autoDarkMode') === 'true' : false,
  },

  mutations: {
    CHANGE_AUTODARKMODE_STATE(state, payload) {
      window.localStorage.setItem('autoDarkMode', payload);
      state.darkMode = payload;
    },
    CHANGE_DARKMODE_STATE(state, payload) {
      console.info('payload',payload);
      console.trace();
      window.localStorage.setItem('darkMode', payload);
      state.darkMode = payload;
    },
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
    setDuration({commit, state}, data) {
      commit('CHANGE_DURATION', parseInt(data) ? parseInt(data): 1);
    },
    setAlwaysOntop({commit, state}, data) {
      commit('CHANGE_ALWAYS_TOP', data);
    },
    changeDarkModeState({commit, state}, data) {
      console.info('payload',data);
      commit('CHANGE_DARKMODE_STATE', data);
    },
    changeAutoDarkModeState({commit, state}, data) {
      commit('CHANGE_AUTODARKMODE_STATE', data);
    }
  }
};