const state = {
  isLogin: false,
  displayName: "",
  token: sessionStorage.getItem("token")
};
const getters = {};
const mutations = {
  LOGIN_SUCCESS(state, payload) {
    const { code, displayName, token } = payload;
    if (code === 0) {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("displayName", displayName);
      state.displayName = displayName;
      state.isLogin = true;
    }
  },
  LOG_OUT(state, payload) {
    state.isLogin = false;
    state.displayName = "";
  }
};
const actions = {
  logout({ commit }) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("displayName");
    commit("LOG_OUT");
  }
};
export default {
  state,
  mutations,
  getters,
  actions
};
