import { Module } from "vuex";
import { IndicatorSate, StoreAction } from "../models/store";

const module: Module<IndicatorSate, any> = {
  namespaced: true,
  state: {
    total: 4,
    current: 1
  },

  mutations: {
    SET(state: IndicatorSate, payload: number): void{
      state.current = payload;
    },
  },

  actions: {
    add({ commit, state}: StoreAction<IndicatorSate>): void {
      commit('SET', state.current+1);
    },
    reset({ commit }: StoreAction<IndicatorSate>): void {
      commit('SET', 1);
    },
    set({ commit }: StoreAction<IndicatorSate>, data: number): void {
      commit('SET', data);
    }
  }
};

export default module;