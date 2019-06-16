import { Module } from "vuex";
import { AppState, StoreAction } from "../models/store";

const module: Module<any, any> = {
  namespaced: true,
  state: {
    isSettingsPageShow: false
  },

  mutations: {
    SET_PAGE_SETTINGS(state: AppState, payload: boolean){
      state.isSettingsPageShow = payload;
    },
  },

  actions: {
    showSettings({commit}: StoreAction<AppState>) {
      commit('SET_PAGE_SETTINGS', true);
    },
    hideSettings({commit}: StoreAction<AppState>) {
      commit('SET_PAGE_SETTINGS', false);
    },
  }
};

export default module;