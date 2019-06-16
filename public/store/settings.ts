import { Module } from "vuex";
import { SettingsState, StoreAction } from "../models/store";

const module: Module<SettingsState, any> = {
  namespaced: true,
  state: {
    alwaysOnTop:  Boolean(window.localStorage.getItem('alwaysOnTop')) || false,
    duration:  parseInt(window.localStorage.getItem('duration') || '0') || 25,
    first: Boolean(window.localStorage.getItem('first')) || true,
    darkMode: Boolean(window.localStorage.getItem('darkMode')) || false,
    autoDarkMode: Boolean(window.localStorage.getItem('autoDarkMode')) || false,
  },

  mutations: {
    CHANGE_AUTODARKMODE_STATE(state: SettingsState, payload: boolean) {
      window.localStorage.setItem('autoDarkMode', payload.toString());
      state.darkMode = payload;
    },
    CHANGE_DARKMODE_STATE(state: SettingsState, payload: boolean) {
      console.info('payload',payload);
      window.localStorage.setItem('darkMode', payload.toString());
      state.darkMode = payload;
    },
    CHANGE_DURATION(state: SettingsState, payload: number){
      window.localStorage.setItem('duration', payload.toString());
      state.duration = payload;
    },
    UNFIRST(state: SettingsState){
      window.localStorage.setItem('first', 'false');
      state.first = false;
    },
    CHANGE_ALWAYS_TOP(state: SettingsState, payload: boolean){
      window.localStorage.setItem('alwaysOnTop', payload.toString());
      require('electron').ipcRenderer.send('settings-change', {alwaysOnTop: payload});
      state.alwaysOnTop = payload;
    },
  },

  actions: {
    setDuration({commit, state}: StoreAction<SettingsState>, data: string) {
      commit('CHANGE_DURATION', parseInt(data) ? parseInt(data): 1);
    },
    setAlwaysOntop({commit, state}: StoreAction<SettingsState>, data: boolean) {
      commit('CHANGE_ALWAYS_TOP', data);
    },
    changeDarkModeState({commit, state}: StoreAction<SettingsState>, data: boolean) {
      console.info('payload',data);
      commit('CHANGE_DARKMODE_STATE', data);
    },
    changeAutoDarkModeState({commit, state}: StoreAction<SettingsState>, data: boolean) {
      commit('CHANGE_AUTODARKMODE_STATE', data);
    }
  }
};

export default module;