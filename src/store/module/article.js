import {
  getArticleList,
  getSingArticle,
  getCategoryArticle
} from "@/service/article.js";

const state = {
  articleList: [],
  singleArticle: {},
  pagination: {
    current: 1,
    pageSize: 2,
    keywords: ""
  },
  count: null
};
const getters = {};
const mutations = {
  GET_ARTICLE_LIST(state, payload) {
    state.articleList = payload.articleList;
    state.count = payload.count;
  },
  GET_SINGL_ARTICLE(state, payload) {
    state.singleArticle = payload;
  },
  CHANGE_CURRENT(state, payload) {
    state.pagination.current = payload;
  },
  GET_CATEGORY_ARTICLE(state, payload) {
    state.articleList = payload;
  },
  CLEAR_ARTICLE_LIST(state) {
    state.articleList = [];
  }
};
const actions = {
  async getArticleListAction({ commit }, params) {
    try {
      const {
        code,
        data: { articleList, count }
      } = await getArticleList(params);
      if (code === 0) {
        commit("GET_ARTICLE_LIST", { articleList, count });
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getSingleArticleAction({ commit }, id) {
    try {
      const { data } = await getSingArticle(id);
      commit("GET_SINGL_ARTICLE", data);
    } catch (err) {
      console.log(err);
    }
  },
  async getCategoryArticleAction({ commit }, category_id) {
    try {
      const { code, data } = await getCategoryArticle(category_id);
      if (code === 0) {
        commit("GET_CATEGORY_ARTICLE", data);
      }
    } catch (err) {
      console.log(err);
    }
  },
  clearArticleListAction({ commit }) {
    commit("CLEAR_ARTICLE_LIST");
  }
};
export default {
  state,
  mutations,
  getters,
  actions
};
