import Vue from 'vue';
import App from './components/App'

import Vuex from 'vuex';
import modules from './store/index';

import {ipcRenderer} from 'electron';

console.log = (...msg) => ipcRenderer.send('log', {type: 'log', message: msg});
console.warn = (...msg) => ipcRenderer.send('log', {type: 'warn', message: msg});
console.error = (...msg) => ipcRenderer.send('log', {type: 'error', message: msg});

Vue.use(Vuex);

if (window.localStorage && window.localStorage.length === 0) {
  window.localStorage.setItem('duration', 25);
  window.localStorage.setItem('alwaysOnTop', true);
  window.localStorage.setItem('first', true);
}

const store = new Vuex.Store({modules});

new Vue({
  el: '#app',
  store,
  render: c => c(App),
});