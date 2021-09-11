import Vue from 'vue';
import Vuex from 'vuex';

import { state, mutations, actions } from './config'

Vue.use(Vuex);

const store = new Vuex.Store({
    state, mutations, actions
});

export { store }