import Vue from "vue";
import {
  Button,
  Input,
  Card,
  pagination,
  Dialog,
  Form,
  FormItem,
  Tag
} from "element-ui";
import App from "./App.vue";
import "./registerServiceWorker";
import moment from "moment";
import router from "./router";
import store from "./store";
import animated from "animate.css";
import "./assets/scss/reset.scss";
import "./assets/font/iconfont.css";
Vue.filter("dateformat", function(dataStr, pattern = "YYYY-MM-DD") {
  return moment(dataStr).format(pattern);
});
Vue.use(animated);
Vue.use(Input)
  .use(Button)
  .use(pagination)
  .use(Dialog)
  .use(Form)
  .use(FormItem)
  .use(Tag)
  .use(Card);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
