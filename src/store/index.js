import Vue from "vue";
import Vuex from "vuex";
import article from "./module/article";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // mutations: {},
  // actions: {},
  // modules: {}
  modules: {
    article
  }
});
