import { getCategory } from '@/service/category.js';
const state = {
  category: []
};
const getters = {};
const mutations = {
  GET_CATEGORY(state, payload) {
    state.category = payload;
  }
};
const actions = {
  async getCategoryAction({ commit }) {
    try {
      const { code, data } = await getCategory();
      if (code === 0) {
        commit('GET_CATEGORY', data);
      }
    } catch (err) {
      // console.log(err);
    }
  }
};
export default {
  state,
  mutations,
  getters,
  actions
};
