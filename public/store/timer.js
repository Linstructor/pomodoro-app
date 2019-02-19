module.exports = {
  namespaced: true,
  state: {
    original: parseInt(window.localStorage.getItem('duration')),
    minutes: parseInt(window.localStorage.getItem('duration')),
    seconds: 0,
    ended: false,
    paused: false,
    running: false,
  },

  getters: {
    minutes: state => {return state.minutes < 10 ? `0${state.minutes}` : state.minutes},
    seconds: state => {return state.seconds < 10 ? `0${state.seconds}` : state.seconds},
  },

  mutations: {
    CHANGE_MINUTES(state, payload){
      state.minutes = payload;
      state.original = payload;
    },
    CHANGE_SECONDS(state, payload){
      if (payload < 0) {
        if (state.minutes === 0) {
          state.ended = true;
          state.running = false;
        } else {
          state.minutes--;
          state.seconds = 59;
        }
      } else {
        state.seconds = payload;
      }
    },
    CHANGE_STATE(state, payload){
      switch (payload) {
        case 'start': {
          state.ended = false;
          state.paused = false;
          state.running = true;
          return;
        }
        case 'stop': {
          state.ended = true;
          state.paused = false;
          state.running = false;
          state.minutes = state.original;
          return;
        }
        case 'pause': {
          state.ended = false;
          state.paused = true;
          state.running = true;
          return;
        }
      }
      state.minutes = payload;
    },
  },

  actions: {
    changeMinutes({commit, state}, data) {
      commit('CHANGE_MINUTES', parseInt(data));
    },
    decount({commit, state}) {
      commit('CHANGE_SECONDS', state.seconds--);
    },
    changeState({commit, state}, data) {
      commit('CHANGE_STATE', data);
    }
  }
};