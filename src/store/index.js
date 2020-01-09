import Vue from 'vue';
import Vuex from 'vuex';
import article from './module/article';
import category from './module/category';
import comment from './module/comment';
import login from './module/login';
import archive from './module/archive';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    article,
    category,
    comment,
    login,
    archive
  }
});
