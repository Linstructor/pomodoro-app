import {shallowMount, createLocalVue} from '@vue/test-utils';
import App from '../components/App.vue';
import Vuex from 'vuex';
import modules from "../store";

const localVue = createLocalVue();
console.log(Vuex);
// localVue.use(Vuex);

let store: any;

beforeEach(() => {
  store = new Vuex.Store({modules});
});

describe('test', function () {
  console.log(Vuex);
  const wrapper = shallowMount(App, {store, localVue});
  console.warn(wrapper);
  expect(true).toBeTruthy();
});