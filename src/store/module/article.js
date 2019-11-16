import { getArticleList, getSingArticle } from "@/service/article.js";
const state = {
  articleList: [],
  singleArticle: {}
};
const getters = {};
const mutations = {
  GET_ARTICLE_LIST(state, payload) {
    state.articleList = payload;
  },
  GET_SINGL_ARTICLE(state, payload) {
    state.singleArticle = payload;
  }
};
const actions = {
  async getarticlelist({ commit }) {
    try {
      const { code, data } = await getArticleList();
      if (code === 0) {
        console.log(data);
        commit("GET_ARTICLE_LIST", data);
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getsingarticle({ commit }, id) {
    console.log(id);
    try {
      const { data } = await getSingArticle(id);
      commit("GET_SINGL_ARTICLE", data);
    } catch (err) {
      console.log(err);
    }
  }
};
export default {
  state,
  mutations,
  getters,
  actions
};
