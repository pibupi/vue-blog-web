import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/assets/scss/index.scss";
import Highlight from "./lib/highlight";
//monokai-sublime.css可以改样式，比如背景透明可以是lightfair.css
// import "highlight.js/styles/atelier-heath-light.css";
// import "highlight.js/styles/atelier-lakeside-light.css";
import "highlight.js/styles/github.css";
Vue.use(Highlight);
// Vue.directive("highlight", {
//   componentUpdated: function(el) {
//     let blocks = el.querySelectorAll("code");
//     console.log(blocks);
//     for (let i = 0; i < blocks.length; i++) {
//       const item = blocks[i];
//       Hljs.highlightBlock(item);
//     }
//   }
// });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
