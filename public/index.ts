import Vue from 'vue';
import App from './components/App.vue'

import Vuex from 'vuex';
import modules from './store/index';

// import {ipcRenderer} from 'electron';

// console.log = (...msg: [string]) => ipcRenderer.send('log', {type: 'log', message: msg});
// console.warn = (...msg: [string]) => ipcRenderer.send('log', {type: 'warn', message: msg});
// console.error = (...msg: [string]) => ipcRenderer.send('log', {type: 'error', message: msg});

Vue.use(Vuex);

if (window.localStorage && window.localStorage.length === 0) {
  window.localStorage.setItem('duration', '25');
  window.localStorage.setItem('alwaysOnTop', 'true');
  window.localStorage.setItem('first', 'true');
  window.localStorage.setItem('darkMode', 'false');
  window.localStorage.setItem('autoDarkMode', 'true');
}

const store: any  = new Vuex.Store({modules});

// ipcRenderer.on('darkmode', (_: null ,data: boolean) => {
//   console.info('setDarkMode', store.state.settings.autoDarkMode, data);
//   if (store.state.settings.autoDarkMode) store.commit('settings/CHANGE_DARKMODE_STATE', data, {root: true});
// });

new Vue({
  el: '#app',
  store,
  render: c => c(App),
});