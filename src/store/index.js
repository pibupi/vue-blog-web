import Vue from "vue";
import Vuex from "vuex";
import article from "./module/article";
import category from "./module/category";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    article,
    category
  }
});
