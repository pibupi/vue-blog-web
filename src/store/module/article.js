import { getArticleList, getCategoryArticle } from '@/service/article.js';

const state = {
  articleList: [],
  pagination: {
    current: 1,
    pageSize: 5,
    keywords: ''
  },
  count: null
};
const getters = {
  articleList: state => {
    state.articleList.forEach(item => {
      item.color = '#1890ff';
    });
    return state.articleList;
  }
};
const mutations = {
  GET_ARTICLE_LIST(state, payload) {
    state.articleList = payload.articleList;
    state.count = payload.count;
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
        commit('GET_ARTICLE_LIST', { articleList, count });
      }
    } catch (err) {
      // console.log(err);
    }
  },
  async getCategoryArticleAction({ commit }, category_id) {
    try {
      const { code, data } = await getCategoryArticle(category_id);
      if (code === 0) {
        commit('GET_CATEGORY_ARTICLE', data);
      }
    } catch (err) {
      // console.log(err);
    }
  },
  clearArticleListAction({ commit }) {
    commit('CLEAR_ARTICLE_LIST');
  }
};
export default {
  state,
  mutations,
  getters,
  actions
};
