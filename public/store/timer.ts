import { Module } from "vuex";
import { StoreAction, TimerState } from "../models/store";

const module:  Module<TimerState, any> = {
  namespaced: true,
  state: {
    original: parseInt(window.localStorage.getItem('duration') || '0'),
    minutes: parseInt(window.localStorage.getItem('duration') || '0'),
    seconds: 0,
    ended: false,
    paused: false,
    running: false,
  },

  getters: {
    getMinutes: (state: TimerState) => {return state.minutes < 10 ? `0${state.minutes}` : state.minutes},
    getSeconds: (state: TimerState) => {return state.seconds < 10 ? `0${state.seconds}` : state.seconds},
  },

  mutations: {
    CHANGE_MINUTES(state: TimerState, payload: number){
      state.minutes = payload;
      state.original = payload;
    },
    CHANGE_SECONDS(state: TimerState, payload: number){
      const newValue = state.seconds - payload;
      if (newValue < 0) {
        if (state.minutes === 0) {
          state.ended = true;
          state.running = false;
        } else {
          state.minutes--;
          state.seconds = 59;

        }
      } else {
        state.seconds = newValue;
      }
    },
    CHANGE_STATE(state: TimerState, payload: TimerStatus){
      switch (payload) {
        case TimerStatus.start: {
          state.ended = false;
          state.paused = false;
          state.running = true;
          return;
        }
        case TimerStatus.stop: {
          state.ended = true;
          state.paused = false;
          state.running = false;
          state.minutes = state.original;
          state.seconds = 0;
          require('electron').ipcRenderer.send('end');
          return;
        }
        case TimerStatus.pause: {
          state.ended = false;
          state.paused = true;
          state.running = true;
          return;
        }
      }
      state.minutes = parseInt(payload);
    },
  },

  actions: {
    changeMinutes({commit, state}: StoreAction<TimerState>, data: number) {
      commit('CHANGE_MINUTES', data);
    },
    decount({commit, state}: StoreAction<TimerState>, data = 1) {
      commit('CHANGE_SECONDS', data);
    },
    changeState({commit, state}: StoreAction<TimerState>, data: TimerStatus) {
      commit('CHANGE_STATE', data);
    }
  }
};

export enum TimerStatus {
  start,
  stop,
  pause
}

export default module;