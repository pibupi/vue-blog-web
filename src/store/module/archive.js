// import { getArchive } from "@/service/archive.js";

// const state = {
//   archive: []
// };
// const getters = {};
// const mutations = {
//   GET_ARCHIVE(state, payload) {
//     state.archive = payload.archive;
//   }
// };
// const actions = {
//   async getArchiveAction({ commit }, params) {
//     console.log(111);
//     try {
//       const {
//         code,
//         data: { archive }
//       } = await getArchive(params);
//       if (code === 0) {
//         commit("GET_ARCHIVE", { archive });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };
// export default {
//   state,
//   mutations,
//   getters,
//   actions
// };
