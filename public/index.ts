import Vue from 'vue';
import App from './components/App.vue'

import Vuex from 'vuex';
import modules from './store/index';

// import {ipcRenderer} from 'electron';

let ipcRenderer: any;
try {
  ipcRenderer = require('electron').ipcRenderer;
} catch (e) {
  console.warn('Electron can\'t be initialized in the projet');
}
if (ipcRenderer) {
  console.log = (...msg: [string]) => ipcRenderer.send('log', {type: 'log', message: msg});
  console.warn = (...msg: [string]) => ipcRenderer.send('log', {type: 'warn', message: msg});
  console.error = (...msg: [string]) => ipcRenderer.send('log', {type: 'error', message: msg});
  ipcRenderer.on('darkmode', (_: null ,data: boolean) => {
    console.info('setDarkMode', store.state.settings.autoDarkMode, data);
    if (store.state.settings.autoDarkMode) store.commit('settings/CHANGE_DARKMODE_STATE', data, {root: true});
  });
}

Vue.use(Vuex);

if (window.localStorage && window.localStorage.length === 0) {
  window.localStorage.setItem('duration', '25');
  window.localStorage.setItem('alwaysOnTop', 'true');
  window.localStorage.setItem('first', 'true');
  window.localStorage.setItem('darkMode', 'false');
  window.localStorage.setItem('autoDarkMode', 'true');
}

const store: any  = new Vuex.Store({modules});

new Vue({
  el: '#app',
  store,
  render: c => c(App),
});