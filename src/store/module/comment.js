import { sendComment } from '@/service/comment.js';
const state = {
  comments: []
};
const getters = {};
const mutations = {
  GET_CATEGORY(state, payload) {
    state.comments = payload;
  }
};
const actions = {
  async sendCommentAction({ commit }, params) {
    try {
      const res = await sendComment(params);
      // commit();
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
